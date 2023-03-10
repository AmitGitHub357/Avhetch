export const Routes = {
    // pages
    // Presentation: { path: "/" },
    LoginPage: { path: "/login" },
    AddConsultant: { path: "/addconsultant" },
    AddMember : { path: "/addmember" },
    Student : { path: "/student" },
    Batch : { path: "/batch" },
    Course : { path: "/course" },
    AddTeamLead: { path: "/addteamlead" },
    AddLead: { path: "/addlead" },
    AddASM: {path:"/addasm"},
    AddCP: {path: "/addcp"},
    AddCPM: {path:"/addcpm"},
    AddLeadAssigner: {path: "/addleadassigner"},
    ModifyLead: { path: "/leads/:id/edit" },
    AdminDashboard: {path: "/"},
    Dashboard : {path:'/dashboard'},
    Consultant: {path: "/consultant"},
    Manager: {path: "/manager"},
    TeamLead: {path: "/teamlead"},
    TotalLeads: {path: "/totalleads"},

    // TotalLeads: {path: "/leads/page/:pageNumber"},
    CancellationLeads: {path: "/cancelledleads"},
    LostSales: {path: "/lostsales"},
    SiteVisits: {path: "/sitevisits"},
    SetMilestone: {path: "/setmilestone"},
    Promotion: {path: "/promotion"},
    AddProject: {path: "/addproject"},
    TaskManager: {path: "/taskmanager"},
    AllProjects: {path: "/allprojects"},
    ProjectDetails: {path: "/projectdetails/:id"},
    Demotwo: {path:"/demo"},
    Leads: {path:"/leads"},
    LostLeads: {path:"/lostleads"},
    SiteVisitsLeads: {path: "/sitevisitedleads"},
    NextFollowUp : {path: "/nextfollowup"},
    UploadLeads: {path: "/uploadleads"},
    BulkLeads: {path: "/bulkleads"},
    Calendar: {path: "/calendar"},
    UserList:{path: "/activitylog"},
    ActivityLog:{path: "/activitylog/:id"},
    EditUser:{path: "/user/:id/edit"},
    CancelledLeadEdit:{path: "/cancelledleads/:id/edit"},
    
    DashboardOverview: { path: "/dashboard/overview" },

    // manager routes
    ManagerDashboard: { path: "/manager/dashboard" },
    ManagerLeads: { path: "/manager/leads" },
    ManagerAddLead: { path: "/manager/addlead" },
    ManagerLostLeads: { path: "/manager/lostleads" },
    ManagerSiteVisitsLeads: { path: "/manager/sitevisitedleads" },
    ManagerCancellationLeads: {path: "/manager/cancelledleads"},
    ManagerNextFollowUp : {path: "/manager/nextfollowup"},
    ManagerAddMember : {path: "/manager/addmember"},
    ManagerTeamLead: {path: "/manager/teamlead"},
    ManagerConsultant: {path: "/manager/consultant"},
    ManagerActivityLog:{path: "/manager/activitylog"},
    ManagerSetMilestone: {path: "/manager/setmilestone"},
    ManagerTaskManager: {path: "/manager/taskmanager"},
    ManagerEditUser:{path: "/manager/user/:id/edit"},
    ManagerBulkLeads: {path: "/manager/bulkleads"},
    ManagerModifyLead: { path: "/manager/leads/:id/edit" },
    ManagerTeamMember: { path: "/manager/team" },

    // channel partner manager routes
    CPManagerDashboard: { path: "/cpmanager/dashboard" },
    CPManagerLeads: { path: "/cpmanager/leads" },
    CPManagerAddLead: { path: "/cpmanager/addlead" },
    CPManagerLostLeads: { path: "/cpmanager/lostleads" },
    CPManagerSiteVisitsLeads: { path: "/cpmanager/sitevisitedleads" },
    CPManagerCancellationLeads: {path: "/cpmanager/cancelledleads"},
    CPManagerNextFollowUp : {path: "/cpmanager/nextfollowup"},
    CPManagerActivityLog:{path: "/cpmanager/activitylog"},
    CPManagerTaskManager: {path: "/cpmanager/taskmanager"},
    CPManagerBulkLeads: {path: "/cpmanager/bulkleads"},
    CPManagerModifyLead: { path: "/cpmanager/leads/:id/edit" },

    //teamlead routes
    TeamLeadDashboard: {path: "/teamlead/dashboard"},
    TeamLeadLeads: { path: "/teamlead/leads" },
    TeamLeadAddLead: { path: "/teamlead/addlead" },
    TeamLeadLostLeads: { path: "/teamlead/lostleads" },
    TeamLeadSiteVisitsLeads: { path: "/teamlead/sitevisitedleads" },
    TeamLeadActivityLog:{path: "/teamlead/activitylog"},
    TeamLeadSetMilestone: {path: "/teamlead/setmilestone"},
    TeamLeadTaskManager: {path: "/teamlead/taskmanager"},
    TeamLeadModifyLead: { path: "/teamlead/leads/:id/edit" },

    //consultant routes
    ConsultantDashboard: {path: "/consultant/dashboard"},
    ConsultantLeads: { path: "/consultant/leads" },
    ConsultantAddLead: { path: "/consultant/addlead" },
    ConsultantLostLeads: { path: "/consultant/lostleads" },
    ConsultantSiteVisitsLeads: { path: "/consultant/sitevisitedleads" },
    ConsultantActivityLog:{path: "/consultant/activitylog"},
    ConsultantNextFollowUp: {path: "/consultant/nextfollowup"},
    ConsultantTaskManager: {path: "/consultant/taskmanager"},
    ConsultantModifyLead: { path: "/consultant/leads/:id/edit" },

    //lead Assigner routes
    leadAssignerDashboard: {path: "/leadassigner/dashboard"},
    leadAssignerLeads: { path: "/leadassigner/leads" },
    leadAssignerAddLead: { path: "/leadassigner/addlead" },
    leadAssignerBulkLeads: { path: "/leadassigner/bulkleads" },

    Transactions: { path: "/transactions" },
    Settings: { path: "/settings" },
    Upgrade: { path: "/upgrade" },
    BootstrapTables: { path: "/tables/bootstrap-tables" },
    Billing: { path: "/examples/billing" },
    Invoice: { path: "/examples/invoice" },
    Signin: { path: "/examples/sign-in" },
    Signup: { path: "/examples/sign-up" },
    ForgotPassword: { path: "/examples/forgot-password" },
    ResetPassword: { path: "/examples/reset-password" },
    Lock: { path: "/examples/lock" },
    NotFound: { path: "/examples/404" },
    ServerError: { path: "/examples/500" },

    // docs
    DocsOverview: { path: "/documentation/overview" },
    DocsDownload: { path: "/documentation/download" },
    DocsQuickStart: { path: "/documentation/quick-start" },
    DocsLicense: { path: "/documentation/license" },
    DocsFolderStructure: { path: "/documentation/folder-structure" },
    DocsBuild: { path: "/documentation/build-tools" },
    DocsChangelog: { path: "/documentation/changelog" },

    // components
    Accordions: { path: "/components/accordions" },
    Alerts: { path: "/components/alerts" },
    Badges: { path: "/components/badges" },
    Widgets: { path: "/widgets" },
    Breadcrumbs: { path: "/components/breadcrumbs" },
    Buttons: { path: "/components/buttons" },
    Forms: { path: "/components/forms" },
    Modals: { path: "/components/modals" },
    Navs: { path: "/components/navs" },
    Navbars: { path: "/components/navbars" },
    Pagination: { path: "/components/pagination" },
    Popovers: { path: "/components/popovers" },
    Progress: { path: "/components/progress" },
    Tables: { path: "/components/tables" },
    Tabs: { path: "/components/tabs" },
    Tooltips: { path: "/components/tooltips" },
    Toasts: { path: "/components/toasts" },
    WidgetsComponent: { path: "/components/widgets" }
};