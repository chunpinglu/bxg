define(['jquery','template'],function($,template){
    $(function(){
        $.ajax({
            url:"/api/course",
            success:function(data){
                if(data.code == 200){
                    console.log(data);
                    $(".courses").html(template("course_list_tpl",data));
                }
            }
        })

    })
})