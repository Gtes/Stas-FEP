$(function () {
    const $userDetailsTemplate = $('#userDetailsTemplate').html();
    const $userDetailsWrapper = $('.user-details-wrapper');
    const usersUrl = 'https://api.github.com/search/users?q=';



    $("#searh-user-input").autocomplete({
        minLength: 2,
        autoFocus: true,
        source: function (request, response) {
            $.getJSON(usersUrl + request.term, function (data) {
                response($.map(data.items, function (value) {
                    return {
                        label: value.login,
                        url: value.url

                    };
                }));
            });
        },
        select: function (event, ui) {
            fetch(ui.item.url).then(response => {
                return response.json()
            }).then(data => {
                renderUserDetails(generateUserDetails(data));
            })
        }
    });


    function generateUserDetails(data) {
        let reposUrl = `https://github.com/${data.login}?tab=repositories`
        let followersUrl = `https://github.com/${data.login}?tab=followers`

        return $userDetailsTemplate
            .replace('{{id}}', data.id)
            .replace('{{avatar_url}}', data.avatar_url)
            .replace('{{name}}', data.name ? data.name : '')
            .replace('{{html_url}}', data.html_url)
            .replace('{{login}}', data.login)
            .replace('{{repos_url}}', reposUrl)
            .replace('{{public_reposNumber}}', data.public_repos)
            .replace('{{followers_url}}', followersUrl)
            .replace('{{followers}}', data.followers)
            .replace('{{created_at}}', generateDate(data.created_at))
    }

    function generateDate(date) {
        date = new Date(date);

        return date.toLocaleDateString();
    }

    function renderUserDetails(data) {
        return $userDetailsWrapper.html(data);
    }






});