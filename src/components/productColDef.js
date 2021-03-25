export const productColDef = [
    
    {
        headerName: "Name",
        field: "name",
        cellRenderer: (params) => `<div class=${params.data.alert === true ? "text-danger" : "" }>${params.value}</div>`,
        sortable: true,
        filter: true
    },
    {
        headerName: "SKU",
        field: "sku",
        cellRenderer: (params) => `<div class=${params.data.alert === true ? "text-danger" : "" }>${params.value}</div>`,
        sortable: true,
        filter: true
    },
    {
        headerName: "Product info",
        field: "description",
        cellRenderer: (params) => `<div class=${params.data.alert === true ? "text-danger" : "" }>${params.value}</div>`,
        sortable: true,
        filter: true
    },
    {
        headerName: "Vendor",
        field: "vendor",
        cellRenderer: (params) => `<div class=${params.data.alert === true ? "text-danger" : "" }>${params.value}</div>`,
        sortable: true,
        filter: true
    },

    {
        headerName: "Category",
        field: "category",
        cellRenderer: (params) => `<div class=${params.data.alert === true ? "text-danger" : "" }>${params.value}</div>`,
        sortable: true,
        filter: true
    },
    {
        headerName: "Current Stock",
        field: "currentStock",
        cellRenderer: (params) => `<div class=${params.data.alert === true ? "text-danger" : "" }>${params.value}</div>`,
        sortable: true,
        filter: true
    },
    {
        headerName: "Reserved",
        field: "reserved",
        cellRenderer: (params) => `<div class=${params.data.alert === true ? "text-danger" : "" }>${params.value}</div>`,
        sortable: true,
        filter: true
    },
    {
        headerName: 'Add to cart',
        field: 'cart',
        checkboxSelection: true
    }
    
]