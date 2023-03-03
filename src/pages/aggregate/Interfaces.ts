import {CommonIdentifier, Form, ICategoryCombo, IMapping, IOrganisationUnit} from "../../Interfaces";
import { Dayjs } from "dayjs";

export interface IDataSet extends CommonIdentifier {
    categoryCombo: ICategoryCombo;
    forms: Form[];
    aggregateId: string;
    selectedSheet: string;
    sheets: string[];
    workbook: string;
    workSheeet: string;
    orgUnistColumn: string;
    periodColumn: string;
    dataStartColumn: number;
    orgUnitStrategy: string;
    organisationUnits: IOrganisationUnit[];
    periodInExcel: boolean;
    organisationUnitInExcel: boolean;
    attributeCombosInExcel: boolean;
    dataElementColumn: string;
    categoryOptionComboColumn: string;
    dataValueColumn: string;
    headerRow: number;
    dataStartRow: number;
    uploadMessage: string;
    uploaded: boolean;
    page: number;
    rowsPerPage: number;
    params: string[];
    isDhis2: boolean;
    dhis2DataSet: string;
    dhis2DataSets: string[];
    mapping: IMapping;
    currentData: any;
    dataValues: any;
    periodType: string;
    period: any;
    displayProgress: boolean;
    displayDhis2Progress: boolean;
    organisation: string;
    organisationColumn: string;
    periodCell: string;
    organisationCell: string;
    url: string;
    pulledData: any;
    responses: any[];
    cell2: any;
    sourceOrganisationUnits: IOrganisationUnit[];
    filterText: string;
    pullingErrors: any[];
    username: string;
    password: string;
    pulling: boolean;
    templateType: any;
    responseKey: string;
    dialogOpen: boolean;
    levels: string[];
    indicators: any[];
    programIndicators: any[];
    selectedIndicators: any[];
    remoteOrganisations: any[];
    currentLevel: string;
    selectedDataSet: string;
    template: number;
    fileName: string;
    mappingName: string;
    mappingDescription: string;
    completeDataSet: boolean;
    multiplePeriods: boolean;
    startPeriod: Dayjs;
    endPeriod: Dayjs;
    // itemStore ;
    // assignedItemStore;
    // dataElementStore;
    // assignedDataElementStore;
    dataIndicators: boolean;
    proIndicators: boolean;
    dataDataElements: boolean;
    message: string;
    scheduleServerUrl: string;
    useProxy: boolean;
    proxy: string;
    processed: boolean;
    isUploadingFromPage: boolean;
    dialogOpened: boolean;
    selectedPeriods: any[];
    action: "upload";
    showOnlyUnmappedUnits: boolean;
    unitsFilter: string;
}