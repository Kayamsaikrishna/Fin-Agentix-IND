# Database Schema

This document outlines the database schema for the Fin-Agentix India platform. The schema is designed to be scalable, secure, and compliant with Indian financial regulations.

## Credit Bureau Integration

```mermaid
erDiagram
    CIBIL_PROFILES {
        string consumer_id PK
        int cibil_score
        string credit_grade
        date last_updated
        int total_accounts
        decimal total_balance
        int payment_history_months
        decimal utilization_ratio
        int enquiries_6mo
        json detailed_accounts
        string employment_segment
        string income_slab
    }
    
    COMMERCIAL_BUREAU {
        string entity_id PK
        string business_name
        string cin_number
        int commercial_score
        decimal credit_limit_sanctioned
        decimal credit_limit_utilized
        string payment_behavior
        json banking_relationships
        string industry_classification
        decimal annual_turnover
    }
    
    ENQUIRY_TRACKING {
        string enquiry_id PK
        string consumer_id FK
        string enquiry_purpose
        string requesting_entity
        date enquiry_date
        string loan_amount_range
        string sector_type
    }
    
    CIBIL_PROFILES ||--o{ ENQUIRY_TRACKING : receives
    COMMERCIAL_BUREAU ||--o{ ENQUIRY_TRACKING : receives
```

## Government & Regulatory Datasets

```mermaid
erDiagram
    GST_REGISTRATIONS {
        string gstin PK
        string business_name
        string business_type
        date registration_date
        string state_code
        string hsn_codes
        string annual_turnover_slab
        boolean active_status
        json authorized_signatories
    }
    
    GST_RETURNS {
        string return_id PK
        string gstin FK
        string return_period
        string return_type
        decimal gross_turnover
        decimal taxable_turnover
        decimal tax_liability
        decimal tax_paid
        date filing_date
        string filing_status
    }
    
    GST_REGISTRATIONS ||--o{ GST_RETURNS : files
```

## Sector-Specific Datasets

### Agriculture Sector

```mermaid
erDiagram
    FARMER_DATABASE {
        string farmer_id PK
        string aadhaar_number
        string name
        string father_name
        string village
        string district
        string state
        decimal total_land_acres
        string land_type
        json crop_pattern
        string irrigation_source
        boolean kisan_credit_card
        decimal annual_income
    }
    
    LAND_RECORDS {
        string survey_number PK
        string farmer_id FK
        string village_code
        decimal area_acres
        string land_classification
        string soil_type
        boolean irrigated
        string crop_grown_current
        string crop_grown_previous
        decimal productivity_per_acre
    }
    
    CROP_INSURANCE {
        string policy_id PK
        string farmer_id FK
        string survey_number FK
        string crop_name
        string season
        decimal sum_insured
        decimal premium_paid
        decimal premium_subsidy
        string insurance_company
        date policy_start_date
        date policy_end_date
    }
    
    WEATHER_DATA {
        string location_code PK
        date weather_date
        decimal temperature_max
        decimal temperature_min
        decimal rainfall_mm
        decimal humidity_percent
        string weather_conditions
        decimal wind_speed
        string advisory_issued
    }
    
    MSP_DATA {
        string commodity_code PK
        string commodity_name
        string crop_year
        decimal msp_price_quintal
        decimal market_price_average
        decimal procurement_quantity
        string major_producing_states
    }
    
    FARMER_DATABASE ||--o{ LAND_RECORDS : owns
    FARMER_DATABASE ||--o{ CROP_INSURANCE : purchases
    LAND_RECORDS ||--o{ WEATHER_DATA : affected_by
    CROP_INSURANCE ||--o{ MSP_DATA : covers
```

### MSME/Business Sector

```mermaid
erDiagram
    COMPANY_MASTER {
        string cin_number PK
        string company_name
        string company_class
        string company_category
        date incorporation_date
        string registered_state
        decimal authorized_capital
        decimal paid_up_capital
        string business_activity
        string listing_status
        string company_status
    }
    
    DIRECTOR_DETAILS {
        string din_number PK
        string director_name
        date appointment_date
        string designation
        string cin_number FK
        boolean active_status
        int number_of_companies
        json other_company_details
    }
    
    FINANCIAL_STATEMENTS {
        string filing_id PK
        string cin_number FK
        string financial_year
        string document_type
        decimal revenue
        decimal profit_before_tax
        decimal profit_after_tax
        decimal total_assets
        decimal total_liabilities
        decimal net_worth
        decimal cash_and_equivalents
        date filing_date
    }
    
    MSME_REGISTRATION {
        string udyam_number PK
        string cin_number FK
        string enterprise_name
        string enterprise_type
        string major_activity
        decimal investment_plant_machinery
        decimal annual_turnover
        string category
        string state
        string district
        date registration_date
        boolean active_status
    }
    
    COMPANY_MASTER ||--o{ DIRECTOR_DETAILS : has
    COMPANY_MASTER ||--o{ FINANCIAL_STATEMENTS : files
    COMPANY_MASTER ||--o{ MSME_REGISTRATION : registers
```

### Real Estate Sector

```mermaid
erDiagram
    RERA_PROJECTS {
        string rera_number PK
        string project_name
        string promoter_name
        string project_type
        string project_status
        string state
        string district
        decimal project_land_area
        int total_units
        decimal total_project_cost
        date registration_date
        date expected_completion
        decimal funds_collected_buyers
        decimal funds_utilized
    }
    
    PROPERTY_REGISTRATIONS {
        string document_number PK
        string sub_registrar_office
        date registration_date
        string property_type
        decimal property_value
        decimal stamp_duty_paid
        decimal registration_fee_paid
        string buyer_name
        string seller_name
        string property_address
        decimal property_area_sqft
        string financing_bank
    }
    
    MUNICIPAL_RECORDS {
        string property_id PK
        string municipal_corporation
        string property_address
        string property_usage
        decimal annual_property_tax
        decimal built_up_area
        decimal carpet_area
        string construction_year
        boolean water_connection
        boolean electricity_connection
        decimal market_value_assessment
    }
    
    RERA_PROJECTS ||--o{ PROPERTY_REGISTRATIONS : includes
    PROPERTY_REGISTRATIONS ||--o{ MUNICIPAL_RECORDS : registered_with
```

### Healthcare Sector

```mermaid
erDiagram
    HEALTHCARE_PROVIDERS {
        string provider_id PK
        string provider_name
        string provider_type
        string registration_number
        string medical_council
        date registration_date
        date registration_expiry
        string specialization
        string hospital_affiliation
        string state
        string district
        boolean nabh_accredited
        json insurance_empanelments
    }
    
    MEDICAL_PROCEDURES {
        string procedure_code PK
        string procedure_name
        string specialty_category
        decimal average_cost_government
        decimal average_cost_private
        int typical_duration_days
        string complexity_level
        json required_infrastructure
        decimal success_rate_percentage
    }
    
    INSURANCE_POLICIES {
        string policy_number PK
        string insurer_name
        string policy_type
        decimal sum_insured
        decimal premium_annual
        json covered_procedures
        decimal copay_percentage
        json network_hospitals
        date policy_start_date
        date policy_end_date
    }
    
    TREATMENT_COST_DATABASE {
        string cost_id PK
        string provider_id FK
        string procedure_code FK
        string insurance_policy FK
        decimal quoted_cost
        decimal insurance_coverage
        decimal patient_liability
        date quote_date
        string approval_status
    }
    
    HEALTHCARE_PROVIDERS ||--o{ TREATMENT_COST_DATABASE : provides
    MEDICAL_PROCEDURES ||--o{ TREATMENT_COST_DATABASE : involves
    INSURANCE_POLICIES ||--o{ TREATMENT_COST_DATABASE : covers
```
