package com.boomhouse.boomhouse.service;

import com.boomhouse.boomhouse.dao.ReportRepository;
import com.boomhouse.boomhouse.entity.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ReportService {
    private ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public Optional<Report> findReportById(UUID id) {
        Optional<Report> theReport = reportRepository.findById(id);

        return theReport;
    }

    public List<Report> findReportsByUserEmail(String userEmail) {
        List<Report> theReports = reportRepository.findReportsByUserEmail(userEmail);

        return theReports;
    }

    public Page<Report> getAllUnResolvedReports(String page, String size) {
        Pageable thePageable = PageRequest.of(
                Integer.parseInt(page),
                Integer.parseInt(size)
        );

        Page<Report> theReports = reportRepository.getAllUnResolvedReports(thePageable);

        return theReports;
    }

    public void createReport(Report report) {
        reportRepository.save(report);
    }
}
