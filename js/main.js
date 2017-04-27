$(document).ready(function () {
    getTasks();
    getCategoryOptions();

    $('#add_task').on('submit', addTask);
    $('body').on('click', '.btn-edit-task', setTask);
});

const apiKey = "DCT90lxiIof3NBf6OOrs9qoWeAakMXjq";

function getTasks() {
    $.get('https://api.mlab.com/api/1/databases/taskmanager/collections/tasks?apiKey=' + apiKey, function (data) {
        let output = '<ul class="list-group">';
        $.each(data, function (key, task) {
            output += '<li class="list-group-item">';
            output += task.task_name + '<span class="due_on">[Due on ' + task.due_date + ']</span>';
            if (task.is_urgent == 'true') {
                output += '<span class="label label-danger">Urgent</span>';
            }
            output += '<div class="pull-right">'+
                      '<a class="btn btn-primary btn-edit-task" data-task-name="'+task.task_name+'" data-task-id="'+task._id.$oid+'">Edit</a>'+
                      '<a class="btn btn-danger" href="#">Delete</a>'+
                      '</div>';
        });
        output += '</ul>';
        $('#tasks').html(output);
    })
}

function getCategoryOptions() {
    $.get('https://api.mlab.com/api/1/databases/taskmanager/collections/categories?apiKey=' + apiKey, function (data) {
        let output;
        $.each(data, function (key, category) {
            output += '<option value = "' + category.category_name + '">' + category.category_name + '</option>';
        });
        $('#category').append(output);
    })
}

function addTask(e) {
    e.preventDefault();

    var task_name = $('#task_name').val();
    var category = $('#category').val();
    var due_date = $('#due_date').val();
    var is_urgent = $('#is_urgent').val();

    $.ajax({
        url:'https://api.mlab.com/api/1/databases/taskmanager/collections/tasks?apiKey=' + apiKey,
        data: JSON.stringify({
            "task_name":task_name,
            "category":category,
            "due_date":due_date,
            "is_urgent":is_urgent,
        }),
        type:'POST',
        contentType: 'application/json',
        success:function(data){
            window.location.href='index.html';
        },
        error:function(xhr, status, err){
            console.log(err); 
        }
    });
}

function setTask()
{
    var task_id = $(this).data('task-id');
    console.log(task_id);

}