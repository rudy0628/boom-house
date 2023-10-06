package com.boomhouse.boomhouse.dao;

import com.boomhouse.boomhouse.entity.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ReportRepository extends JpaRepository<Report, UUID> {
    @Query("SELECT r FROM Report r WHERE r.isResolved = false")
    Page<Report> getAllUnResolvedReports(Pageable pageable);

    @Query("SELECT r FROM Report r WHERE r.reportEmail = :report_email")
    List<Report> findReportsByUserEmail(@Param("report_email") String reportEmail);
}
