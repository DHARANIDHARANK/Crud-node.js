$("#add_user").submit(function(event){
    alert("Data inserted Successfully")
})

$("#update_user").submit(function(event)
{
    event.preventDefault();
    const data={}
    var unindented_arr=$(this).serializeArray()
    $.map(unindented_arr,function(n,i){
        data[n['name']]=n['value']
    })
   
    console.log(unindented_arr)
    var request={
        "url" : `http://localhost:5002/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }
    $.ajax(request).done(function(response)
    {
        alert("Data updated Successfully!");
    })
})

if(window.location.pathname == '/'){
    $ondelete = $(".table tbody td a.delete")
    $ondelete.click(function(){

        var id=$(this).attr("data_id")


        var request={
            "url" : `http://localhost:5002/api/users/${id}`,
            "method": "DELETE"
        }
        if(confirm("Do you really want to delete the data"))
        {
$.ajax(request).done(function(response)
{
    alert("Data deleted successfully ")
})
        }
    })
}