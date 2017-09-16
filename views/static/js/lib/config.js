require.config({
    baseUrl: "/views/assets",
    paths: {
        jquery: "./jquery/jquery",
        cookie: "./jquery-cookie/jquery.cookie",
        template: "./artTemplate/template",
        bootstrap: "./bootstrap/js/bootstrap",
        form:"./jquery-form/jquery.form",
        utils: "../static/js/lib/utils",
        Nprogress:"./nprogress/nprogress",
        datepicker:"./bootstrap-datepicker/js/bootstrap-datepicker",
        datepickerCN:"./bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
        validate:"./jquery-validate/jquery-validate",
        ckeditor:"./ckeditor/ckeditor",
        region:"./jquery-region/jquery.region",
        uploadify:"./uploadify/jquery.uploadify"
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
        datepickerCN:{
            deps:["jquery"]
        },
        validate:{
            deps:["jquery"]
        },
        ckeditor:{
            exports:"CKEDITOR"
        },
        uploadify:{
            deps:["jquery"]
        }

    }
})