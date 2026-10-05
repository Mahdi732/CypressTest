export const VESSELS_ENDPOINTS = {
  FETCH_VESSELS: '/api/registry/vessels',
  GET_VESSEL_BY_ID: '/api/registry/vessels/:id',
  CREATE_VESSEL: '/api/registry/vessels',
  UPDATE_VESSEL: '/api/registry/vessels/:id',
  UPDATE_VESSEL_OWNERSHIP: '/api/registry/vessels/:id/ownership',
  GET_VESSEL_OWNERSHIP: '/api/registry/vessels/:id/ownership',
  GET_VESSEL_MORTGAGES: '/api/registry/vessels/:id/mortgages',
  DELETE_VESSEL: '/api/registry/vessels/:id',
  ACTIVATE_VESSEL: '/api/registry/vessels/:id/activate',
  DEACTIVATE_VESSEL: '/api/registry/vessels/:id/deactivate'
};

export const VESSELS_SELECTORS = {
  MAIN_PAGE: {
    PAGE_BODY: '.page-body',
    HEADER: {
      TITLE: '.page-body .hero h1',
      DESCRIPTION: '.page-body .hero p',
      ADD_VESSEL_BTN: '.page-body .hero .btn-primary'
    },
    SEARCH_AND_FILTERS: {
      SEARCH_INPUT: '.page-body .search input',
      SEARCH_ICON: '.page-body .search i.pi-search',
      FILTER_DROPDOWN: '.page-body .list-filters select',
      CLEAR_FILTERS_BTN: '.page-body .ghost',
      COLUMNS_TOGGLE: '.page-body .columns-trigger',
      COLUMNS_MENU: '.page-body .columns-menu',
      COLUMNS_SEARCH: '.page-body .columns-search input',
      COLUMNS_OPTION: '.page-body .column-option',
      COLUMN_SELECTED: '.page-body .column-option.selected'
    },
    TABLE_HEADERS: {
      VESSEL_NAME: '.page-body table.data-table thead th:nth-child(1)',
      REGISTRY_NUMBER: '.page-body table.data-table thead th:nth-child(2)',
      IMO: '.page-body table.data-table thead th:nth-child(3)',
      MMSI: '.page-body table.data-table thead th:nth-child(4)',
      STATUS: '.page-body table.data-table thead th:nth-child(5)',
      VESSEL_TYPE: '.page-body table.data-table thead th:nth-child(6)',
      GROSS_TONNAGE: '.page-body table.data-table thead th:nth-child(7)',
      LENGTH_OVERALL: '.page-body table.data-table thead th:nth-child(8)',
      ACTIONS: '.page-body table.data-table thead th.col-actions--header'
    },
    TABLE: {
      TABLE: '.page-body table.data-table',
      ROWS: '.page-body table.data-table tbody tr.clickable-row',
      EMPTY_STATE: '.page-body table.data-table tbody tr .empty-state',
      DATA_CELL: '.page-body table.data-table tbody td',
      STATUS_BADGE: '.page-body table.data-table tbody .status-pill',
      ROW_ACTIONS: {
        VIEW: '.page-body .action-btn.view',
        EDIT: '.page-body .action-btn.edit',
        DELETE: '.page-body .action-btn.delete',
        CERTIFICATES: '.page-body .action-btn.certificates'
      }
    },
    PAGINATION: {
      ROWS_PER_PAGE_LABEL: '.page-body .rows-per-page span',
      ROWS_PER_PAGE_SELECT: '.page-body .rows-per-page select',
      PAGINATION_INFO: '.page-body .pagination-info',
      PAGE_BUTTONS: '.page-body .pagination-controls .page-btn',
      ACTIVE_PAGE: '.page-body .pagination-controls .page-btn.active',
      FIRST: '.page-body .pagination-controls .page-btn:nth-child(1)',
      PREVIOUS: '.page-body .pagination-controls .page-btn:nth-child(2)',
      PAGE_1: '.page-body .pagination-controls .page-btn:nth-child(3)',
      PAGE_2: '.page-body .pagination-controls .page-btn:nth-child(4)',
      PAGE_3: '.page-body .pagination-controls .page-btn:nth-child(5)',
      NEXT: '.page-body .pagination-controls .page-btn:nth-last-child(2)',
      LAST: '.page-body .pagination-controls .page-btn:last-child'
    }
  },
  ADD_EDIT_MODAL: {
    OVERLAY: '.drawer-overlay',
    PANEL: '.details-drawer-panel',
    FORM: '#vesselForm',
    HEADER: {
      TITLE: '.details-drawer-panel .drawer-header h3',
      CLOSE_BTN: '.details-drawer-panel .close-btn',
      EXPAND_BTN: '.details-drawer-panel .expand-btn'
    },
    TABS: {
      VESSEL_INFO: '.drawer-tabs button:nth-child(1)',
      OWNERSHIP: '.drawer-tabs button:nth-child(2)',
      MORTGAGES: '.drawer-tabs button:nth-child(3)'
    },
    FOOTER: {
      CANCEL: '.drawer-footer .btn-secondary',
      SAVE: '.drawer-footer .btn-primary',
      CLOSE: '.drawer-footer .btn-secondary'
    },
    IDENTIFICATION: {
      NAME: 'input[name="currentName"]',
      REGISTRY_NUMBER: 'input[name="registryNumber"]',
      REGISTRATION_TYPE: 'select[name="status"]',
      VESSEL_TYPE: 'p-select[name="shipTypeId"]',
      INTENDED_SERVICE: 'input[name="intendedServiceCode"]',
      PORT_OF_REGISTRY: 'p-select[name="registryPortId"]',
      APPLICANT: 'p-select[name="partyId"]',
      REGISTRATION_DATE: 'input[name="initialRegistrationDate"]',
      ANNIVERSARY_DATE: 'input[name="anniversaryDate"]'
    },
    IDENTIFICATION_NUMBERS: {
      IMO: 'input[name="imo"]',
      MMSI: 'input[name="mmsi"]',
      CALL_SIGN: 'input[name="callSign"]',
      REGISTRATION_OFFICIAL_NUMBER: 'input[name="officialNumber"]',
      ALLOCATED_ON_APPROVAL_PLACEHOLDER: 'input[name="mmsi"][placeholder*="allocated on approval"]'
    },
    CONSTRUCTION: {
      BUILD_YEAR: 'input[name="buildYear"]',
      KEEL_LAYING_DATE: 'input[name="keelLayingDate"]',
      DELIVERY_DATE: 'input[name="deliveryDate"]',
      SHIPYARD: 'input[name="shipyardName"]',
      PLACE_OF_BUILD: 'input[name="buildPlace"]',
      COUNTRY_OF_BUILD: 'p-select[name="buildCountryId"]',
      HULL_IDENTIFICATION_NUMBER: 'input[name="hullNumber"]'
    },
    TONNAGE_DIMENSIONS: {
      GROSS_TONNAGE: 'input[name="grossTonnage"]',
      NET_TONNAGE: 'input[name="netTonnage"]',
      DEADWEIGHT: 'input[name="deadweight"]',
      LENGTH_OVERALL: 'input[name="lengthOverall"]',
      LENGTH_BETWEEN_PERPENDICULARS: 'input[name="lengthBetweenPerpendiculars"]',
      BREADTH: 'input[name="breadth"]',
      DEPTH: 'input[name="depth"]',
      SUMMER_DRAFT: 'input[name="summerDraft"]'
    },
    MACHINERY_CAPACITY: {
      HULL_MATERIAL: 'p-select[name="hullMaterialId"]',
      PROPULSION_TYPE: 'p-select[name="propulsionTypeId"]',
      NUMBER_OF_MAIN_ENGINES: 'input[name="numberOfMainEngines"]',
      ENGINE_MAKE_MODEL: 'input[name="engineMakeModel"]',
      TOTAL_PROPULSION_POWER: 'input[name="enginePowerKW"]',
      SERVICE_SPEED: 'input[name="serviceSpeed"]',
      CREW_COMPLEMENT: 'input[name="crewComplement"]',
      PASSENGER_CAPACITY: 'input[name="passengerCapacity"]'
    },
    OPERATOR_ISM: {
      OPERATOR_NAME: 'input[name="operatorName"]',
      IMO_COMPANY_NUMBER: 'input[name="imoCompanyNumber"]',
      ISM_DOC_HOLDER: 'input[name="docHolder"]',
      OPERATION_COUNTRY: 'input[name="operatorCountry"]',
      DESIGNATED_PERSON_ASHORE: 'input[name="designatedPersonAshore"]',
      EMERGENCY_CONTACT: 'input[name="emergencyContact"]'
    },
    REGISTRY_INFO: {
      FLAG_COUNTRY: 'p-select[name="flagCountryId"]',
      CLASSIFICATION_SOCIETY: 'p-select[name="classificationSocietyId"]',
      LAST_SURVEY_DATE: 'input[name="lastSurveyDate"]',
      NEXT_SURVEY_DUE_DATE: 'input[name="nextSurveyDueDate"]',
      COMPLIANCE_STATUS: 'select[name="complianceStatusId"]',
      HAS_ACTIVE_MORTGAGE: 'input[name="hasActiveMortgage"]',
      INTENDED_DELETION_DATE: 'input[name="deletionDate"]',
      REMARKS: 'textarea[name="remarks"]'
    },
    OWNERSHIP_MANAGEMENT: {
      ROLE_CARD: '.ownership-role-card',
      REGISTERED_OWNER_CARD: '.ownership-role-card:nth-child(1)',
      COMMERCIAL_MANAGER_CARD: '.ownership-role-card:nth-child(2)',
      OPERATOR_CHARTERER_CARD: '.ownership-role-card:nth-child(3)',
      TECHNICAL_MANAGER_CARD: '.ownership-role-card:nth-child(4)',
      ISM_MANAGER_CARD: '.ownership-role-card:nth-child(5)',
      SELECT_MANAGER: '.ownership-action-btn--primary',
      RESET_FORM: '.ownership-action-btn[title*="Reset"]',
      CANCEL_CHANGES: '.ownership-action-btn[title*="Cancel"]',
      NEW_REGISTERED_OWNER: '.ownership-action-btn--primary',
      NAME_INPUT: 'input[name^="ownershipName"]',
      IMO_NUMBER_INPUT: 'input[name^="ownershipImo"]',
      NATIONALITY_INPUT: 'input[name^="ownershipNationality"]',
      ADDRESS_TEXTAREA: 'textarea[name^="ownershipAddress"]',
      RECORDED_SINCE_INPUT: 'input[name^="ownershipDate"]',
      OWNERSHIP_PERCENTAGE: 'input[name^="ownershipPercentage"]',
      OWNER_SUGGESTIONS: '.ownership-owner-suggestions li',
      OWNER_CLEAR_BUTTON: '.ownership-party-name-field__clear',
      EMPTY_STATE: '.ownership-empty'
    },
    VALIDATION: {
      FORM_ERROR: '.form-error',
      FIELD_ERROR: '.field-error',
      OWNER_PERCENTAGE_ERROR: '.ownership-percentage-error'
    }
  },
  DETAILS_MODAL: {
    OVERLAY: '.drawer-overlay',
    PANEL: '.details-drawer-panel',
    HEADER: {
      TITLE: '.details-drawer-panel .drawer-header h3',
      VESSEL_NAME: '.details-drawer-panel .drawer-meta-item--name strong',
      REGISTRY_CODE: '.details-drawer-panel .drawer-meta-code',
      STATUS_BADGE: '.details-drawer-panel .drawer-status-tag',
      CLOSE_BTN: '.details-drawer-panel .close-btn',
      EXPAND_BTN: '.details-drawer-panel .expand-btn'
    },
    TABS: {
      VESSEL_INFO: '.drawer-tabs button:nth-child(1)',
      OWNERSHIP: '.drawer-tabs button:nth-child(2)',
      MORTGAGES: '.drawer-tabs button:nth-child(3)'
    },
    FOOTER: {
      CLOSE: '.drawer-footer .btn-secondary',
      DELETE: '.drawer-footer .btn-danger',
      EDIT: '.drawer-footer .btn-primary'
    },
    DETAILS_SECTIONS: {
      IDENTITY_SECTION: '.detail-section h4',
      OWNERSHIP_SECTION: '.ownership-panel',
      MORTGAGES_SECTION: '.mortgages-panel'
    }
  }
};

export const VESSELS_CONSTANTS = {
  ROUTE: '/deep-registry/vessels',
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_SORT: 'createdAt',
  STATUS_OPTIONS: {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    PROVISIONAL: 'PROVISIONAL',
    DEFINITIVE: 'DEFINITIVE',
    DELETED: 'DELETED'
  },
  TABLE_COLUMNS: {
    VESSEL_NAME: 'currentName',
    REGISTRY_NUMBER: 'registryNumber',
    IMO: 'imo',
    MMSI: 'mmsi',
    STATUS: 'vesselStatusCode',
    VESSEL_TYPE: 'shipTypeId',
    GROSS_TONNAGE: 'grossTonnage',
    LENGTH_OVERALL: 'lengthOverall'
  }
};
