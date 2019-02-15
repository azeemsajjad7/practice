$(document).ready(function () {
    $('#serachUser').keyup(function (event) {
        let username = event.target.value

        //make req to github

        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: '8d3dba9cdcd9d12e700f',
                client_secret: '5166632ef89d35ae9910b31df9cf1f7d8868c3c1'
            }
        }).done(function (user) {
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: '8d3dba9cdcd9d12e700f',
                    client_secret: '5166632ef89d35ae9910b31df9cf1f7d8868c3c1',
                    sort: 'created:asc',
                    per_page: 5
                }
            }).done(function (repos) {
                $.each(repos, function (index, repo) {
                    $('#repos').append(`
                        <table class="table table-hover">
                            <tr class="table-light">
                                <td style="width:600px"><strong>${repo.name}</strong> : ${repo.description}</td>
                                <td>
                                    <button type="button" class="btn btn-primary" disabled="disabled">Forks : ${repo.forks_count}</button>
                                    <button type="button" class="btn btn-secondary" disabled="disabled">Watchers : ${repo.watchers_count}</button>
                                    <button type="button" class="btn btn-success" disabled="disabled">Stars : ${repo.stargazers_count}</button>
                                </td>
                                <td> <a href="${repo.html_url}" target="_blank">Repo Page</a></td>
                            </tr>
                        </table>
                    `)
                })
            })
            $('#profile').html(`
            <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">${user.name}</h3>
            </div>
            <div class="panel-body">                
                <div class="row">
                    <div class="col-md-3">
                        <img class="thumbnail avatar" src="${user.avatar_url}">
                        <br><br>
                        <a target="_blank" href="${user.html_url}" class="btn btn-primary btn-block">View Profile</a>
                    </div>
                    <div class="col-md-9">
                        <button type="button" class="btn btn-primary" disabled="disabled">Public Repos : ${user.public_repos}</button>
                        <button type="button" class="btn btn-secondary" disabled="disabled">Public Gist : ${user.public_gists}</button>
                        <button type="button" class="btn btn-success" disabled="disabled">Followers : ${user.followers}</button>
                        <button type="button" class="btn btn-info" disabled="disabled">Following : ${user.following}</button>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">Company : ${user.company}</li>
                            <li class="list-group-item">Website/blog : ${user.blog}</li>
                            <li class="list-group-item">Location : ${user.location}</li>
                            <li class="list-group-item">Member Since : ${user.created_at}</li>
                            <li class="list-group-item">Email : ${user.email}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <br><br>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
            `)
        })
    })
})