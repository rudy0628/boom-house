package com.boomhouse.boomhouse.rest;

import com.boomhouse.boomhouse.entity.Report;
import com.boomhouse.boomhouse.service.ReportService;
import com.boomhouse.boomhouse.utils.ExtractJWT;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin("http://127.0.0.1:5173")
@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/find/{userEmail}")
    public List<Report> findReportsByUserEmail(@PathVariable("userEmail") String userEmail) {
        return reportService.findReportsByUserEmail(userEmail);
    }

    @GetMapping("/findAll")
    public Page<Report> getAllUnResolvedReports(
            @RequestParam String page,
            @RequestParam String size,
            @RequestParam String adminId) throws Exception {
        String userRole = ExtractJWT.getUserRole(adminId);

        if(!userRole.equals("Admin")) {
            throw new Exception("Authentication failed, you are invalid user");
        }

        Page<Report> theReports = reportService.getAllUnResolvedReports(page, size);

        return theReports;
    }

    @PostMapping("/secure")
    public void addReport(
            @RequestHeader(value = "Authorization") String token,
            @RequestBody Report report) throws Exception {
        String userEmail = ExtractJWT.getUserInfo(token, "email");

        if(userEmail == null) {
            throw new Exception("Authentication failed, you are invalid user");
        }

        report.setIsResolved(false);
        report.setIsViolated(false);

        reportService.createReport(report);
    }

    @PutMapping("/secure/{id}")
    public void updateReport(
            @RequestHeader(value = "Authorization") String token,
            @PathVariable("id") UUID id,
            @RequestBody Boolean isViolated) throws Exception {
        String userId = ExtractJWT.getUserInfo(token, "sub");
        String userRole = ExtractJWT.getUserRole(userId);

        if(!userRole.equals("Admin")) {
            throw new Exception("Authentication failed, you are invalid user");
        }

        // find the report by id
        Optional<Report> theReport = reportService.findReportById(id);

        if(theReport.isEmpty()) {
            throw new Exception("Cannot find the report");
        }

        // set resolved is true
        theReport.get().setIsResolved(true);

        // set is violated
        theReport.get().setIsViolated(isViolated);

        // save the report
        reportService.createReport(theReport.get());
    }
}
