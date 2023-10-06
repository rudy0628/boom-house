package com.boomhouse.boomhouse.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "report")
@Data
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    // the report item id
    @Column(name = "report_id", nullable = false)
    private String reportId;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "thing", nullable = false)
    private String thing;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "report_email", nullable = false)
    private String reportEmail;

    @Column(name = "be_reported_email", nullable = false)
    private String beReportedEmail;

    @Column(name = "is_resolved", nullable = false)
    private Boolean isResolved;

    @Column(name = "is_violated", nullable = false)
    private Boolean isViolated;

    @UpdateTimestamp
    @Column(name="update_time", nullable = false)
    private LocalDateTime updateTime;

    public Report() {
    }

    public Report(String reportId, String type, String thing, String description, String reportEmail,
                  String beReportedEmail) {
        this.reportId = reportId;
        this.type = type;
        this.thing = thing;
        this.description = description;
        this.reportEmail = reportEmail;
        this.beReportedEmail = beReportedEmail;
    }
}
