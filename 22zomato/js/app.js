//mykey=c3247e705a1c39a76239b62cd2d31805
//extrakey=0a661374a6b58eb2fa84142d27fe81ca



$(document).ready(function () {

    $.ajax({
        method: "GET",
        crossDomain: true,
        url: `https://developers.zomato.com/api/v2.1/categories`,
        dataType: "json",
        async: true,
        headers: {
            "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
        },
        success: function (data) {
            var category = data.categories
            for (i = 0; i < category.length; i++) {
                $('#allCat').append(`
                            <option class="cats" value="${category[i].categories.id}">${category[i].categories.name}</option>
                        `)
            }
        },
        error: function () {
            console.log("ERROR")
        }
    })

    //by restaurant

    $('#searchRestaurant').click(function () {
        var restaurantInput = $('#enterRestaurant').val()
        if (restaurantInput == '') {
            var noInput = `<div class="alert alert-dismissible alert-danger">Please Input Restaurant Name</div>`
            $('#serachResult').html(noInput)
        } else {
            $.ajax({
                method: "GET",
                crossDomain: true,
                url: `https://ipapi.co/json/`,
                dataType: "json",
                async: true,
                success: function (data) {
                    $.ajax({
                        method: "GET",
                        crossDomain: true,
                        url: `https://developers.zomato.com/api/v2.1/search?q=${restaurantInput}&lat=${data.latitude}&lon=${data.longitude}&sort=rating`,
                        dataType: "json",
                        async: true,
                        headers: {
                            "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                        },
                        success: function (data) {
                            var allRestaurents = data.restaurants
                            var output = ''
                            $.each(allRestaurents, function (index, restaurant) {
                                var thumb = restaurant.restaurant.thumb
                                if (thumb == "") {
                                    thumb = "images/Image-not-found.gif"
                                }
                                output += `
                                <div class="searchResultRestaurant">
                                    <div>
                                        <img id="thumbImage" src="${thumb}" alt="Image Not Found" style="border:2px solid black">
                                        <div id="nameDetails">
                                            <h5 id="restaurantName">${restaurant.restaurant.name}</h5>
                                        </div>
                                        <div>
                                            <button id="restaurantId${restaurant.restaurant.id}" class="btn btn-primary">Restaurant Details</button>
                                        </div>    
                                    </div>
                                </div>
                                `
                            })
                            $('#serachResult').html(output)
                            if (data.results_found == 0) {
                                var noRestaurant = `<div class="alert alert-dismissible alert-danger">No Restaurant By That Name</div>`
                                $('#serachResult').html(noRestaurant)
                            }
                            $.each(allRestaurents, function (index, restaurant) {
                                var resId = restaurant.restaurant.id
                                $('#restaurantId' + resId).click(function () {
                                    $.ajax({
                                        method: "GET",
                                        crossDomain: true,
                                        url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`,
                                        dataType: "json",
                                        async: true,
                                        headers: {
                                            "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                        },
                                        success: function (data) {
                                            if (data.thumb == "")
                                                var image = "images/Image-not-found.gif"
                                            else
                                                image = data.thumb
                                            var name = data.name
                                            var locality = data.location.locality_verbose
                                            var address = data.location.address
                                            var cuisines = data.cuisines
                                            var ratingColor = data.user_rating.rating_color
                                            var rating = data.user_rating.aggregate_rating
                                            var ratingText = data.user_rating.rating_text
                                            var costOfTwo = data.currency + " " + data.average_cost_for_two
                                            if (data.has_online_delivery == 1)
                                                var onlineDelivery = "YES"
                                            else
                                                onlineDelivery = "NO"
                                            if (data.is_delivering_now == 1)
                                                var deliveringNow = "YES"
                                            else
                                                deliveringNow = "NO"
                                            if (data.is_table_reservation_supported == 1)
                                                var tableReservation = "YES"
                                            else
                                                tableReservation = "NO"
                                            var restaurantDetail = `
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <img src="${image}" alt="">
                                                </div>
                                                <div class="col-md-8">
                                                    <h2>${name}</h2>
                                                    <h6>${locality}</h6>
                                                    <ul class="list-group">
                                                        <li class="list-group-item"><strong>Address : </strong>${address}</li>
                                                        <li class="list-group-item"><strong>Cuisines : </strong>${cuisines}</li>
                                                        <li class="list-group-item"><strong>Rating : </strong><span style="background-color:#${ratingColor};color:white"><strong>${rating}/5</strong></span>  ${ratingText}</li>
                                                        <li class="list-group-item"><strong>Cost for Two : </strong>${costOfTwo}</li>
                                                        <li class="list-group-item"><strong>Online Delivery : </strong>${onlineDelivery}</li>
                                                        <li class="list-group-item"><strong>Delivering Now : </strong>${deliveringNow}</li>
                                                        <li class="list-group-item"><strong>Table Reservation : </strong>${tableReservation}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            `
                                            $('#serachResult').html(restaurantDetail)
                                            var menu = data.menu_url
                                            var cuisinesPhotos = data.photos_url
                                            var zomatoLink = data.url
                                            var extraLink = `
                                                <a href="${menu}" id="menu" target="_blank" class="btn btn-primary">menu</a>
                                                <a href="${cuisinesPhotos}" id="cuisinesPhotos" target="_blank" class="btn btn-primary">cuisines photo</a>
                                                <a href="${zomatoLink}" id="zomatoLink" target="_blank" class="btn btn-primary">zomato link</a>
                                            `
                                            $('#moreSearchResult').html(extraLink)
                                        },
                                        error: function () {
                                            console.log("ERROR")
                                        }
                                    })
                                })
                            })
                            var resultFound = data.results_found
                            var totalResult = data.results_shown
                            var totalResultPage = Math.ceil(resultFound / totalResult)
                            if (resultFound > totalResult) {
                                var allPageResult = ''
                                for (i = 1; i <= totalResultPage && i <= 5; i++) {
                                    allPageResult += `
                                        <button id="page${i}" class="btn btn-primary">${i}</button>
                                    `
                                }
                            }
                            $('#moreSearchResult').html(allPageResult)
                            $('#page1').click(function () {
                                $.ajax({
                                    method: "GET",
                                    crossDomain: true,
                                    url: `https://ipapi.co/json/`,
                                    dataType: "json",
                                    async: true,
                                    success: function (data) {
                                        $.ajax({
                                            method: "GET",
                                            crossDomain: true,
                                            url: `https://developers.zomato.com/api/v2.1/search?q=${restaurantInput}&lat=${data.latitude}&lon=${data.longitude}&sort=rating`,
                                            dataType: "json",
                                            headers: {
                                                "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                            },
                                            success: function (data) {
                                                var allRestaurents = data.restaurants
                                                var output = ''
                                                $.each(allRestaurents, function (index, restaurant) {
                                                    var thumb = restaurant.restaurant.thumb
                                                    if (thumb == "") {
                                                        thumb = "images/Image-not-found.gif"
                                                    }
                                                    output += `
                                                        <div class="searchResultRestaurant">
                                                            <div>
                                                                <img id="thumbImage" src="${thumb}" alt="Image Not Found" style="border:2px solid black">
                                                                <div id="nameDetails">
                                                                    <h5 id="restaurantName">${restaurant.restaurant.name}</h5>
                                                                </div>
                                                                <div>
                                                                    <button id="restaurantId${restaurant.restaurant.id}" class="btn btn-primary">Restaurant Details</button>
                                                                </div>    
                                                            </div>
                                                        </div>
                                                    `
                                                })
                                                $('#serachResult').html(output)
                                                $.each(allRestaurents, function (index, restaurant) {
                                                    var resId = restaurant.restaurant.id
                                                    $('#restaurantId' + resId).click(function () {
                                                        $.ajax({
                                                            method: "GET",
                                                            crossDomain: true,
                                                            url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`,
                                                            dataType: "json",
                                                            async: true,
                                                            headers: {
                                                                "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                            },
                                                            success: function (data) {
                                                                if (data.thumb == "")
                                                                    var image = "images/Image-not-found.gif"
                                                                else
                                                                    image = data.thumb
                                                                var name = data.name
                                                                var locality = data.location.locality_verbose
                                                                var address = data.location.address
                                                                var cuisines = data.cuisines
                                                                var ratingColor = data.user_rating.rating_color
                                                                var rating = data.user_rating.aggregate_rating
                                                                var ratingText = data.user_rating.rating_text
                                                                var costOfTwo = data.currency + " " + data.average_cost_for_two
                                                                if (data.has_online_delivery == 1)
                                                                    var onlineDelivery = "YES"
                                                                else
                                                                    onlineDelivery = "NO"
                                                                if (data.is_delivering_now == 1)
                                                                    var deliveringNow = "YES"
                                                                else
                                                                    deliveringNow = "NO"
                                                                if (data.is_table_reservation_supported == 1)
                                                                    var tableReservation = "YES"
                                                                else
                                                                    tableReservation = "NO"
                                                                var restaurantDetail = `
                                                                    <div class="row">
                                                                        <div class="col-md-4">
                                                                            <img src="${image}" alt="">
                                                                        </div>
                                                                        <div class="col-md-8">
                                                                            <h2>${name}</h2>
                                                                            <h6>${locality}</h6>
                                                                            <ul class="list-group">
                                                                                <li class="list-group-item"><strong>Address : </strong>${address}</li>
                                                                                <li class="list-group-item"><strong>Cuisines : </strong>${cuisines}</li>
                                                                                <li class="list-group-item"><strong>Rating : </strong><span style="background-color:#${ratingColor};color:white"><strong>${rating}/5</strong></span>  ${ratingText}</li>
                                                                                <li class="list-group-item"><strong>Cost for Two : </strong>${costOfTwo}</li>
                                                                                <li class="list-group-item"><strong>Online Delivery : </strong>${onlineDelivery}</li>
                                                                                <li class="list-group-item"><strong>Delivering Now : </strong>${deliveringNow}</li>
                                                                                <li class="list-group-item"><strong>Table Reservation : </strong>${tableReservation}</li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                `
                                                                $('#serachResult').html(restaurantDetail)
                                                                var menu = data.menu_url
                                                                var cuisinesPhotos = data.photos_url
                                                                var zomatoLink = data.url
                                                                var extraLink = `
                                                                    <a href="${menu}" id="menu" target="_blank" class="btn btn-primary">menu</a>
                                                                    <a href="${cuisinesPhotos}" id="cuisinesPhotos" target="_blank" class="btn btn-primary">cuisines photo</a>
                                                                    <a href="${zomatoLink}" id="zomatoLink" target="_blank" class="btn btn-primary">zomato link</a>
                                                                `
                                                                $('#moreSearchResult').html(extraLink)
                                                            },
                                                            error: function () {
                                                                console.log("ERROR")
                                                            }
                                                        })
                                                    })
                                                })
                                            },
                                            error: function () {
                                                console.log("ERROR")
                                            }
                                        })
                                    }
                                })
                            })
                            $('#page2').click(function () {
                                $.ajax({
                                    method: "GET",
                                    crossDomain: true,
                                    url: `https://ipapi.co/json/`,
                                    dataType: "json",
                                    async: true,
                                    success: function (data) {
                                        $.ajax({
                                            method: "GET",
                                            crossDomain: true,
                                            url: `https://developers.zomato.com/api/v2.1/search?q=${restaurantInput}&start=20&lat=${data.latitude}&lon=${data.longitude}&sort=rating`,
                                            dataType: "json",
                                            headers: {
                                                "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                            },
                                            success: function (data) {
                                                var allRestaurents = data.restaurants
                                                var output = ''
                                                $.each(allRestaurents, function (index, restaurant) {
                                                    var thumb = restaurant.restaurant.thumb
                                                    if (thumb == "") {
                                                        thumb = "images/Image-not-found.gif"
                                                    }
                                                    output += `
                                                        <div class="searchResultRestaurant">
                                                            <div>
                                                                <img id="thumbImage" src="${thumb}" alt="Image Not Found" style="border:2px solid black">
                                                                <div id="nameDetails">
                                                                    <h5 id="restaurantName">${restaurant.restaurant.name}</h5>
                                                                </div>
                                                                <div>
                                                                    <button id="restaurantId${restaurant.restaurant.id}" class="btn btn-primary">Restaurant Details</button>
                                                                </div>    
                                                            </div>
                                                        </div>
                                                    `
                                                })
                                                $('#serachResult').html(output)
                                                $.each(allRestaurents, function (index, restaurant) {
                                                    var resId = restaurant.restaurant.id
                                                    $('#restaurantId' + resId).click(function () {
                                                        $.ajax({
                                                            method: "GET",
                                                            crossDomain: true,
                                                            url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`,
                                                            dataType: "json",
                                                            async: true,
                                                            headers: {
                                                                "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                            },
                                                            success: function (data) {
                                                                if (data.thumb == "")
                                                                    var image = "images/Image-not-found.gif"
                                                                else
                                                                    image = data.thumb
                                                                var name = data.name
                                                                var locality = data.location.locality_verbose
                                                                var address = data.location.address
                                                                var cuisines = data.cuisines
                                                                var ratingColor = data.user_rating.rating_color
                                                                var rating = data.user_rating.aggregate_rating
                                                                var ratingText = data.user_rating.rating_text
                                                                var costOfTwo = data.currency + " " + data.average_cost_for_two
                                                                if (data.has_online_delivery == 1)
                                                                    var onlineDelivery = "YES"
                                                                else
                                                                    onlineDelivery = "NO"
                                                                if (data.is_delivering_now == 1)
                                                                    var deliveringNow = "YES"
                                                                else
                                                                    deliveringNow = "NO"
                                                                if (data.is_table_reservation_supported == 1)
                                                                    var tableReservation = "YES"
                                                                else
                                                                    tableReservation = "NO"
                                                                var restaurantDetail = `
                                                                    <div class="row">
                                                                        <div class="col-md-4">
                                                                            <img src="${image}" alt="">
                                                                        </div>
                                                                        <div class="col-md-8">
                                                                            <h2>${name}</h2>
                                                                            <h6>${locality}</h6>
                                                                            <ul class="list-group">
                                                                                <li class="list-group-item"><strong>Address : </strong>${address}</li>
                                                                                <li class="list-group-item"><strong>Cuisines : </strong>${cuisines}</li>
                                                                                <li class="list-group-item"><strong>Rating : </strong><span style="background-color:#${ratingColor};color:white"><strong>${rating}/5</strong></span>  ${ratingText}</li>
                                                                                <li class="list-group-item"><strong>Cost for Two : </strong>${costOfTwo}</li>
                                                                                <li class="list-group-item"><strong>Online Delivery : </strong>${onlineDelivery}</li>
                                                                                <li class="list-group-item"><strong>Delivering Now : </strong>${deliveringNow}</li>
                                                                                <li class="list-group-item"><strong>Table Reservation : </strong>${tableReservation}</li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                `
                                                                $('#serachResult').html(restaurantDetail)
                                                                var menu = data.menu_url
                                                                var cuisinesPhotos = data.photos_url
                                                                var zomatoLink = data.url
                                                                var extraLink = `
                                                                    <a href="${menu}" id="menu" target="_blank" class="btn btn-primary">menu</a>
                                                                    <a href="${cuisinesPhotos}" id="cuisinesPhotos" target="_blank" class="btn btn-primary">cuisines photo</a>
                                                                    <a href="${zomatoLink}" id="zomatoLink" target="_blank" class="btn btn-primary">zomato link</a>
                                                                `
                                                                $('#moreSearchResult').html(extraLink)
                                                            },
                                                            error: function () {
                                                                console.log("ERROR")
                                                            }
                                                        })
                                                    })
                                                })
                                            },
                                            error: function () {
                                                console.log("ERROR")
                                            }
                                        })
                                    }
                                })
                            })
                            $('#page3').click(function () {
                                $.ajax({
                                    method: "GET",
                                    crossDomain: true,
                                    url: `https://ipapi.co/json/`,
                                    dataType: "json",
                                    async: true,
                                    success: function (data) {
                                        $.ajax({
                                            method: "GET",
                                            crossDomain: true,
                                            url: `https://developers.zomato.com/api/v2.1/search?q=${restaurantInput}&start=40&lat=${data.latitude}&lon=${data.longitude}&sort=rating`,
                                            dataType: "json",
                                            headers: {
                                                "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                            },
                                            success: function (data) {
                                                var allRestaurents = data.restaurants
                                                var output = ''
                                                $.each(allRestaurents, function (index, restaurant) {
                                                    var thumb = restaurant.restaurant.thumb
                                                    if (thumb == "") {
                                                        thumb = "images/Image-not-found.gif"
                                                    }
                                                    output += `
                                                        <div class="searchResultRestaurant">
                                                            <div>
                                                                <img id="thumbImage" src="${thumb}" alt="Image Not Found" style="border:2px solid black">
                                                                <div id="nameDetails">
                                                                    <h5 id="restaurantName">${restaurant.restaurant.name}</h5>
                                                                </div>
                                                                <div>
                                                                    <button id="restaurantId${restaurant.restaurant.id}" class="btn btn-primary">Restaurant Details</button>
                                                                </div>    
                                                            </div>
                                                        </div>
                                                    `
                                                })
                                                $('#serachResult').html(output)
                                                $.each(allRestaurents, function (index, restaurant) {
                                                    var resId = restaurant.restaurant.id
                                                    $('#restaurantId' + resId).click(function () {
                                                        $.ajax({
                                                            method: "GET",
                                                            crossDomain: true,
                                                            url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`,
                                                            dataType: "json",
                                                            async: true,
                                                            headers: {
                                                                "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                            },
                                                            success: function (data) {
                                                                if (data.thumb == "")
                                                                    var image = "images/Image-not-found.gif"
                                                                else
                                                                    image = data.thumb
                                                                var name = data.name
                                                                var locality = data.location.locality_verbose
                                                                var address = data.location.address
                                                                var cuisines = data.cuisines
                                                                var ratingColor = data.user_rating.rating_color
                                                                var rating = data.user_rating.aggregate_rating
                                                                var ratingText = data.user_rating.rating_text
                                                                var costOfTwo = data.currency + " " + data.average_cost_for_two
                                                                if (data.has_online_delivery == 1)
                                                                    var onlineDelivery = "YES"
                                                                else
                                                                    onlineDelivery = "NO"
                                                                if (data.is_delivering_now == 1)
                                                                    var deliveringNow = "YES"
                                                                else
                                                                    deliveringNow = "NO"
                                                                if (data.is_table_reservation_supported == 1)
                                                                    var tableReservation = "YES"
                                                                else
                                                                    tableReservation = "NO"
                                                                var restaurantDetail = `
                                                                    <div class="row">
                                                                        <div class="col-md-4">
                                                                            <img src="${image}" alt="">
                                                                        </div>
                                                                        <div class="col-md-8">
                                                                            <h2>${name}</h2>
                                                                            <h6>${locality}</h6>
                                                                            <ul class="list-group">
                                                                                <li class="list-group-item"><strong>Address : </strong>${address}</li>
                                                                                <li class="list-group-item"><strong>Cuisines : </strong>${cuisines}</li>
                                                                                <li class="list-group-item"><strong>Rating : </strong><span style="background-color:#${ratingColor};color:white"><strong>${rating}/5</strong></span>  ${ratingText}</li>
                                                                                <li class="list-group-item"><strong>Cost for Two : </strong>${costOfTwo}</li>
                                                                                <li class="list-group-item"><strong>Online Delivery : </strong>${onlineDelivery}</li>
                                                                                <li class="list-group-item"><strong>Delivering Now : </strong>${deliveringNow}</li>
                                                                                <li class="list-group-item"><strong>Table Reservation : </strong>${tableReservation}</li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                `
                                                                $('#serachResult').html(restaurantDetail)
                                                                var menu = data.menu_url
                                                                var cuisinesPhotos = data.photos_url
                                                                var zomatoLink = data.url
                                                                var extraLink = `
                                                                    <a href="${menu}" id="menu" target="_blank" class="btn btn-primary">menu</a>
                                                                    <a href="${cuisinesPhotos}" id="cuisinesPhotos" target="_blank" class="btn btn-primary">cuisines photo</a>
                                                                    <a href="${zomatoLink}" id="zomatoLink" target="_blank" class="btn btn-primary">zomato link</a>
                                                                `
                                                                $('#moreSearchResult').html(extraLink)
                                                            },
                                                            error: function () {
                                                                console.log("ERROR")
                                                            }
                                                        })
                                                    })
                                                })
                                            },
                                            error: function () {
                                                console.log("ERROR")
                                            }
                                        })
                                    }
                                })
                            })
                            $('#page4').click(function () {
                                $.ajax({
                                    method: "GET",
                                    crossDomain: true,
                                    url: `https://ipapi.co/json/`,
                                    dataType: "json",
                                    async: true,
                                    success: function (data) {
                                        $.ajax({
                                            method: "GET",
                                            crossDomain: true,
                                            url: `https://developers.zomato.com/api/v2.1/search?q=${restaurantInput}&start=60&lat=${data.latitude}&lon=${data.longitude}&sort=rating`,
                                            dataType: "json",
                                            headers: {
                                                "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                            },
                                            success: function (data) {
                                                var allRestaurents = data.restaurants
                                                var output = ''
                                                $.each(allRestaurents, function (index, restaurant) {
                                                    var thumb = restaurant.restaurant.thumb
                                                    if (thumb == "") {
                                                        thumb = "images/Image-not-found.gif"
                                                    }
                                                    output += `
                                                        <div class="searchResultRestaurant">
                                                            <div>
                                                                <img id="thumbImage" src="${thumb}" alt="Image Not Found" style="border:2px solid black">
                                                                <div id="nameDetails">
                                                                    <h5 id="restaurantName">${restaurant.restaurant.name}</h5>
                                                                </div>
                                                                <div>
                                                                    <button id="restaurantId${restaurant.restaurant.id}" class="btn btn-primary">Restaurant Details</button>
                                                                </div>    
                                                            </div>
                                                        </div>
                                                    `
                                                })
                                                $('#serachResult').html(output)
                                                $.each(allRestaurents, function (index, restaurant) {
                                                    var resId = restaurant.restaurant.id
                                                    $('#restaurantId' + resId).click(function () {
                                                        $.ajax({
                                                            method: "GET",
                                                            crossDomain: true,
                                                            url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`,
                                                            dataType: "json",
                                                            async: true,
                                                            headers: {
                                                                "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                            },
                                                            success: function (data) {
                                                                if (data.thumb == "")
                                                                    var image = "images/Image-not-found.gif"
                                                                else
                                                                    image = data.thumb
                                                                var name = data.name
                                                                var locality = data.location.locality_verbose
                                                                var address = data.location.address
                                                                var cuisines = data.cuisines
                                                                var ratingColor = data.user_rating.rating_color
                                                                var rating = data.user_rating.aggregate_rating
                                                                var ratingText = data.user_rating.rating_text
                                                                var costOfTwo = data.currency + " " + data.average_cost_for_two
                                                                if (data.has_online_delivery == 1)
                                                                    var onlineDelivery = "YES"
                                                                else
                                                                    onlineDelivery = "NO"
                                                                if (data.is_delivering_now == 1)
                                                                    var deliveringNow = "YES"
                                                                else
                                                                    deliveringNow = "NO"
                                                                if (data.is_table_reservation_supported == 1)
                                                                    var tableReservation = "YES"
                                                                else
                                                                    tableReservation = "NO"
                                                                var restaurantDetail = `
                                                                    <div class="row">
                                                                        <div class="col-md-4">
                                                                            <img src="${image}" alt="">
                                                                        </div>
                                                                        <div class="col-md-8">
                                                                            <h2>${name}</h2>
                                                                            <h6>${locality}</h6>
                                                                            <ul class="list-group">
                                                                                <li class="list-group-item"><strong>Address : </strong>${address}</li>
                                                                                <li class="list-group-item"><strong>Cuisines : </strong>${cuisines}</li>
                                                                                <li class="list-group-item"><strong>Rating : </strong><span style="background-color:#${ratingColor};color:white"><strong>${rating}/5</strong></span>  ${ratingText}</li>
                                                                                <li class="list-group-item"><strong>Cost for Two : </strong>${costOfTwo}</li>
                                                                                <li class="list-group-item"><strong>Online Delivery : </strong>${onlineDelivery}</li>
                                                                                <li class="list-group-item"><strong>Delivering Now : </strong>${deliveringNow}</li>
                                                                                <li class="list-group-item"><strong>Table Reservation : </strong>${tableReservation}</li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                `
                                                                $('#serachResult').html(restaurantDetail)
                                                                var menu = data.menu_url
                                                                var cuisinesPhotos = data.photos_url
                                                                var zomatoLink = data.url
                                                                var extraLink = `
                                                                    <a href="${menu}" id="menu" target="_blank" class="btn btn-primary">menu</a>
                                                                    <a href="${cuisinesPhotos}" id="cuisinesPhotos" target="_blank" class="btn btn-primary">cuisines photo</a>
                                                                    <a href="${zomatoLink}" id="zomatoLink" target="_blank" class="btn btn-primary">zomato link</a>
                                                                `
                                                                $('#moreSearchResult').html(extraLink)
                                                            },
                                                            error: function () {
                                                                console.log("ERROR")
                                                            }
                                                        })
                                                    })
                                                })
                                            },
                                            error: function () {
                                                console.log("ERROR")
                                            }
                                        })
                                    }
                                })
                            })
                            $('#page5').click(function () {
                                $.ajax({
                                    method: "GET",
                                    crossDomain: true,
                                    url: `https://ipapi.co/json/`,
                                    dataType: "json",
                                    async: true,
                                    success: function (data) {
                                        $.ajax({
                                            method: "GET",
                                            crossDomain: true,
                                            url: `https://developers.zomato.com/api/v2.1/search?q=${restaurantInput}&start=80&lat=${data.latitude}&lon=${data.longitude}&sort=rating`,
                                            dataType: "json",
                                            headers: {
                                                "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                            },
                                            success: function (data) {
                                                var allRestaurents = data.restaurants
                                                var output = ''
                                                $.each(allRestaurents, function (index, restaurant) {
                                                    var thumb = restaurant.restaurant.thumb
                                                    if (thumb == "") {
                                                        thumb = "images/Image-not-found.gif"
                                                    }
                                                    output += `
                                                        <div class="searchResultRestaurant">
                                                            <div>
                                                                <img id="thumbImage" src="${thumb}" alt="Image Not Found" style="border:2px solid black">
                                                                <div id="nameDetails">
                                                                    <h5 id="restaurantName">${restaurant.restaurant.name}</h5>
                                                                </div>
                                                                <div>
                                                                    <button id="restaurantId${restaurant.restaurant.id}" class="btn btn-primary">Restaurant Details</button>
                                                                </div>    
                                                            </div>
                                                        </div>
                                                    `
                                                })
                                                $('#serachResult').html(output)
                                                $.each(allRestaurents, function (index, restaurant) {
                                                    var resId = restaurant.restaurant.id
                                                    $('#restaurantId' + resId).click(function () {
                                                        $.ajax({
                                                            method: "GET",
                                                            crossDomain: true,
                                                            url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`,
                                                            dataType: "json",
                                                            async: true,
                                                            headers: {
                                                                "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                            },
                                                            success: function (data) {
                                                                if (data.thumb == "")
                                                                    var image = "images/Image-not-found.gif"
                                                                else
                                                                    image = data.thumb
                                                                var name = data.name
                                                                var locality = data.location.locality_verbose
                                                                var address = data.location.address
                                                                var cuisines = data.cuisines
                                                                var ratingColor = data.user_rating.rating_color
                                                                var rating = data.user_rating.aggregate_rating
                                                                var ratingText = data.user_rating.rating_text
                                                                var costOfTwo = data.currency + " " + data.average_cost_for_two
                                                                if (data.has_online_delivery == 1)
                                                                    var onlineDelivery = "YES"
                                                                else
                                                                    onlineDelivery = "NO"
                                                                if (data.is_delivering_now == 1)
                                                                    var deliveringNow = "YES"
                                                                else
                                                                    deliveringNow = "NO"
                                                                if (data.is_table_reservation_supported == 1)
                                                                    var tableReservation = "YES"
                                                                else
                                                                    tableReservation = "NO"
                                                                var restaurantDetail = `
                                                                    <div class="row">
                                                                        <div class="col-md-4">
                                                                            <img src="${image}" alt="">
                                                                        </div>
                                                                        <div class="col-md-8">
                                                                            <h2>${name}</h2>
                                                                            <h6>${locality}</h6>
                                                                            <ul class="list-group">
                                                                                <li class="list-group-item"><strong>Address : </strong>${address}</li>
                                                                                <li class="list-group-item"><strong>Cuisines : </strong>${cuisines}</li>
                                                                                <li class="list-group-item"><strong>Rating : </strong><span style="background-color:#${ratingColor};color:white"><strong>${rating}/5</strong></span>  ${ratingText}</li>
                                                                                <li class="list-group-item"><strong>Cost for Two : </strong>${costOfTwo}</li>
                                                                                <li class="list-group-item"><strong>Online Delivery : </strong>${onlineDelivery}</li>
                                                                                <li class="list-group-item"><strong>Delivering Now : </strong>${deliveringNow}</li>
                                                                                <li class="list-group-item"><strong>Table Reservation : </strong>${tableReservation}</li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                `
                                                                $('#serachResult').html(restaurantDetail)
                                                                var menu = data.menu_url
                                                                var cuisinesPhotos = data.photos_url
                                                                var zomatoLink = data.url
                                                                var extraLink = `
                                                                    <a href="${menu}" id="menu" target="_blank" class="btn btn-primary">menu</a>
                                                                    <a href="${cuisinesPhotos}" id="cuisinesPhotos" target="_blank" class="btn btn-primary">cuisines photo</a>
                                                                    <a href="${zomatoLink}" id="zomatoLink" target="_blank" class="btn btn-primary">zomato link</a>
                                                                `
                                                                $('#moreSearchResult').html(extraLink)
                                                            },
                                                            error: function () {
                                                                console.log("ERROR")
                                                            }
                                                        })
                                                    })
                                                })
                                            },
                                            error: function () {
                                                console.log("ERROR")
                                            }
                                        })
                                    }
                                })
                            })
                        },
                        error: function () {
                            console.log("ERROR")
                        }
                    })
                },
                error: function () {
                    console.log("ERROR")
                }
            })
        }
    })

    //by location

    $('.input-group-text').click(function () {
        $.ajax({
            method: "GET",
            crossDomain: true,
            url: `https://ipapi.co/json/`,
            dataType: "json",
            async: true,
            success: function (data) {
                var currentCity = data.city
                var lat = data.latitude
                var lon = data.longitude
                $('#enterCity').attr('placeholder', currentCity)
                $('#searchCity').click(function () {
                    var selectedCategory = $('#allCat :selected').attr('value')
                    if (selectedCategory == undefined) {
                        alert("Please Select any Category")
                    }
                    else {
                        $.ajax({
                            method: "GET",
                            crossDomain: true,
                            url: `https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${lon}7&category=${selectedCategory}&sort=rating`,
                            dataType: "json",
                            async: true,
                            headers: {
                                "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                            },
                            success: function (data) {
                                var allRestaurents = data.restaurants
                                var output = ''
                                $.each(allRestaurents, function (index, restaurant) {
                                    var thumb = restaurant.restaurant.thumb
                                    if (thumb == "")
                                        thumb = "images/Image-not-found.gif"
                                    output += `
                                                <div class="searchResultRestaurant">
                                                    <div>
                                                        <img id="thumbImage" src="${thumb}" alt="Image Not Found" style="border:2px solid black">
                                                        <div id="nameDetails">
                                                            <h5 id="restaurantName">${restaurant.restaurant.name}</h5>
                                                        </div>
                                                        <div>
                                                            <button id="restaurantId${restaurant.restaurant.id}" class="btn btn-primary">Restaurant Details</button>
                                                        </div>    
                                                    </div>
                                                </div>
                                            `
                                })
                                $('#serachResult').html(output)
                                $.each(allRestaurents, function (index, restaurant) {
                                    var resId = restaurant.restaurant.id
                                    $('#restaurantId' + resId).click(function () {
                                        $.ajax({
                                            method: "GET",
                                            crossDomain: true,
                                            url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`,
                                            dataType: "json",
                                            async: true,
                                            headers: {
                                                "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                            },
                                            success: function (data) {
                                                if (data.thumb == "")
                                                    var image = "images/Image-not-found.gif"
                                                else
                                                    image = data.thumb
                                                var name = data.name
                                                var locality = data.location.locality_verbose
                                                var address = data.location.address
                                                var cuisines = data.cuisines
                                                var ratingColor = data.user_rating.rating_color
                                                var rating = data.user_rating.aggregate_rating
                                                var ratingText = data.user_rating.rating_text
                                                var costOfTwo = data.currency + " " + data.average_cost_for_two
                                                if (data.has_online_delivery == 1)
                                                    var onlineDelivery = "YES"
                                                else
                                                    onlineDelivery = "NO"
                                                if (data.is_delivering_now == 1)
                                                    var deliveringNow = "YES"
                                                else
                                                    deliveringNow = "NO"
                                                if (data.is_table_reservation_supported == 1)
                                                    var tableReservation = "YES"
                                                else
                                                    tableReservation = "NO"
                                                var restaurantDetail = `
                                                                <div class="row">
                                                                    <div class="col-md-4">
                                                                        <img src="${image}" alt="">
                                                                    </div>
                                                                    <div class="col-md-8">
                                                                        <h2>${name}</h2>
                                                                        <h6>${locality}</h6>
                                                                        <ul class="list-group">
                                                                            <li class="list-group-item"><strong>Address : </strong>${address}</li>
                                                                            <li class="list-group-item"><strong>Cuisines : </strong>${cuisines}</li>
                                                                            <li class="list-group-item"><strong>Rating : </strong><span style="background-color:#${ratingColor};color:white"><strong>${rating}/5</strong></span>  ${ratingText}</li>
                                                                            <li class="list-group-item"><strong>Cost for Two : </strong>${costOfTwo}</li>
                                                                            <li class="list-group-item"><strong>Online Delivery : </strong>${onlineDelivery}</li>
                                                                            <li class="list-group-item"><strong>Delivering Now : </strong>${deliveringNow}</li>
                                                                            <li class="list-group-item"><strong>Table Reservation : </strong>${tableReservation}</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            `
                                                $('#serachResult').html(restaurantDetail)
                                                var menu = data.menu_url
                                                var cuisinesPhotos = data.photos_url
                                                var zomatoLink = data.url
                                                var extraLink = `
                                                                <a href="${menu}" id="menu" target="_blank" class="btn btn-primary">menu</a>
                                                                <a href="${cuisinesPhotos}" id="cuisinesPhotos" target="_blank" class="btn btn-primary">cuisines photo</a>
                                                                <a href="${zomatoLink}" id="zomatoLink" target="_blank" class="btn btn-primary">zomato link</a>
                                                            `
                                                $('#moreSearchResult').html(extraLink)
                                            }
                                        })
                                    })
                                })
                                var resultFound = data.results_found
                                var totalResult = data.results_shown
                                var totalResultPage = Math.ceil(resultFound / totalResult)
                                if (resultFound > totalResult) {
                                    var allPageResult = ''
                                    for (i = 1; i <= totalResultPage && i <= 5; i++) {
                                        allPageResult += `
                                                    <button id="page${i}" class="btn btn-primary">${i}</button>
                                                `
                                    }
                                }
                                $('#moreSearchResult').html(allPageResult)
                                $('#page1').click(function () {
                                    $.ajax({
                                        method: "GET",
                                        crossDomain: true,
                                        url: `https://ipapi.co/json/`,
                                        dataType: "json",
                                        async: true,
                                        success: function (data) {
                                            var lat = data.latitude
                                            var lon = data.longitude
                                            $.ajax({
                                                method: "GET",
                                                crossDomain: true,
                                                url: `https://developers.zomato.com/api/v2.1/search?&lat=${lat}&lon=${lon}7&category=${selectedCategory}&sort=rating`,
                                                dataType: "json",
                                                headers: {
                                                    "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                },
                                                success: function (data) {
                                                    var allRestaurents = data.restaurants
                                                    var output = ''
                                                    $.each(allRestaurents, function (index, restaurant) {
                                                        var thumb = restaurant.restaurant.thumb
                                                        if (thumb == "")
                                                            thumb = "images/Image-not-found.gif"
                                                        output += `
                                                                    <div class="searchResultRestaurant">
                                                                        <div>
                                                                            <img id="thumbImage" src="${thumb}" alt="Image Not Found" style="border:2px solid black">
                                                                            <div id="nameDetails">
                                                                                <h5 id="restaurantName">${restaurant.restaurant.name}</h5>
                                                                            </div>
                                                                            <div>
                                                                                <button id="restaurantId${restaurant.restaurant.id}" class="btn btn-primary">Restaurant Details</button>
                                                                            </div>    
                                                                        </div>
                                                                    </div>
                                                                `
                                                    })
                                                    $('#serachResult').html(output)
                                                    $.each(allRestaurents, function (index, restaurant) {
                                                        var resId = restaurant.restaurant.id
                                                        $('#restaurantId' + resId).click(function () {
                                                            $.ajax({
                                                                method: "GET",
                                                                crossDomain: true,
                                                                url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`,
                                                                dataType: "json",
                                                                async: true,
                                                                headers: {
                                                                    "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                                },
                                                                success: function (data) {
                                                                    if (data.thumb == "")
                                                                        var image = "images/Image-not-found.gif"
                                                                    else
                                                                        image = data.thumb
                                                                    var name = data.name
                                                                    var locality = data.location.locality_verbose
                                                                    var address = data.location.address
                                                                    var cuisines = data.cuisines
                                                                    var ratingColor = data.user_rating.rating_color
                                                                    var rating = data.user_rating.aggregate_rating
                                                                    var ratingText = data.user_rating.rating_text
                                                                    var costOfTwo = data.currency + " " + data.average_cost_for_two
                                                                    if (data.has_online_delivery == 1)
                                                                        var onlineDelivery = "YES"
                                                                    else
                                                                        onlineDelivery = "NO"
                                                                    if (data.is_delivering_now == 1)
                                                                        var deliveringNow = "YES"
                                                                    else
                                                                        deliveringNow = "NO"
                                                                    if (data.is_table_reservation_supported == 1)
                                                                        var tableReservation = "YES"
                                                                    else
                                                                        tableReservation = "NO"
                                                                    var restaurantDetail = `
                                                                                    <div class="row">
                                                                                        <div class="col-md-4">
                                                                                            <img src="${image}" alt="">
                                                                                        </div>
                                                                                        <div class="col-md-8">
                                                                                            <h2>${name}</h2>
                                                                                            <h6>${locality}</h6>
                                                                                            <ul class="list-group">
                                                                                                <li class="list-group-item"><strong>Address : </strong>${address}</li>
                                                                                                <li class="list-group-item"><strong>Cuisines : </strong>${cuisines}</li>
                                                                                                <li class="list-group-item"><strong>Rating : </strong><span style="background-color:#${ratingColor};color:white"><strong>${rating}/5</strong></span>  ${ratingText}</li>
                                                                                                <li class="list-group-item"><strong>Cost for Two : </strong>${costOfTwo}</li>
                                                                                                <li class="list-group-item"><strong>Online Delivery : </strong>${onlineDelivery}</li>
                                                                                                <li class="list-group-item"><strong>Delivering Now : </strong>${deliveringNow}</li>
                                                                                                <li class="list-group-item"><strong>Table Reservation : </strong>${tableReservation}</li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                `
                                                                    $('#serachResult').html(restaurantDetail)
                                                                    var menu = data.menu_url
                                                                    var cuisinesPhotos = data.photos_url
                                                                    var zomatoLink = data.url
                                                                    var extraLink = `
                                                                                    <a href="${menu}" id="menu" target="_blank" class="btn btn-primary">menu</a>
                                                                                    <a href="${cuisinesPhotos}" id="cuisinesPhotos" target="_blank" class="btn btn-primary">cuisines photo</a>
                                                                                    <a href="${zomatoLink}" id="zomatoLink" target="_blank" class="btn btn-primary">zomato link</a>
                                                                                `
                                                                    $('#moreSearchResult').html(extraLink)
                                                                }
                                                            })
                                                        })
                                                    })
                                                }
                                            })
                                        }
                                    })
                                })
                                $('#page2').click(function () {
                                    $.ajax({
                                        method: "GET",
                                        crossDomain: true,
                                        url: `https://ipapi.co/json/`,
                                        dataType: "json",
                                        async: true,
                                        success: function (data) {
                                            var lat = data.latitude
                                            var lon = data.longitude
                                            $.ajax({
                                                method: "GET",
                                                crossDomain: true,
                                                url: `https://developers.zomato.com/api/v2.1/search?start=20&lat=${lat}&lon=${lon}7&category=${selectedCategory}&sort=rating`,
                                                dataType: "json",
                                                headers: {
                                                    "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                },
                                                success: function (data) {
                                                    var allRestaurents = data.restaurants
                                                    var output = ''
                                                    $.each(allRestaurents, function (index, restaurant) {
                                                        var thumb = restaurant.restaurant.thumb
                                                        if (thumb == "")
                                                            thumb = "images/Image-not-found.gif"
                                                        output += `
                                                                    <div class="searchResultRestaurant">
                                                                        <div>
                                                                            <img id="thumbImage" src="${thumb}" alt="Image Not Found" style="border:2px solid black">
                                                                            <div id="nameDetails">
                                                                                <h5 id="restaurantName">${restaurant.restaurant.name}</h5>
                                                                            </div>
                                                                            <div>
                                                                                <button id="restaurantId${restaurant.restaurant.id}" class="btn btn-primary">Restaurant Details</button>
                                                                            </div>    
                                                                        </div>
                                                                    </div>
                                                                `
                                                    })
                                                    $('#serachResult').html(output)
                                                    $.each(allRestaurents, function (index, restaurant) {
                                                        var resId = restaurant.restaurant.id
                                                        $('#restaurantId' + resId).click(function () {
                                                            $.ajax({
                                                                method: "GET",
                                                                crossDomain: true,
                                                                url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`,
                                                                dataType: "json",
                                                                async: true,
                                                                headers: {
                                                                    "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                                },
                                                                success: function (data) {
                                                                    if (data.thumb == "")
                                                                        var image = "images/Image-not-found.gif"
                                                                    else
                                                                        image = data.thumb
                                                                    var name = data.name
                                                                    var locality = data.location.locality_verbose
                                                                    var address = data.location.address
                                                                    var cuisines = data.cuisines
                                                                    var ratingColor = data.user_rating.rating_color
                                                                    var rating = data.user_rating.aggregate_rating
                                                                    var ratingText = data.user_rating.rating_text
                                                                    var costOfTwo = data.currency + " " + data.average_cost_for_two
                                                                    if (data.has_online_delivery == 1)
                                                                        var onlineDelivery = "YES"
                                                                    else
                                                                        onlineDelivery = "NO"
                                                                    if (data.is_delivering_now == 1)
                                                                        var deliveringNow = "YES"
                                                                    else
                                                                        deliveringNow = "NO"
                                                                    if (data.is_table_reservation_supported == 1)
                                                                        var tableReservation = "YES"
                                                                    else
                                                                        tableReservation = "NO"
                                                                    var restaurantDetail = `
                                                                                    <div class="row">
                                                                                        <div class="col-md-4">
                                                                                            <img src="${image}" alt="">
                                                                                        </div>
                                                                                        <div class="col-md-8">
                                                                                            <h2>${name}</h2>
                                                                                            <h6>${locality}</h6>
                                                                                            <ul class="list-group">
                                                                                                <li class="list-group-item"><strong>Address : </strong>${address}</li>
                                                                                                <li class="list-group-item"><strong>Cuisines : </strong>${cuisines}</li>
                                                                                                <li class="list-group-item"><strong>Rating : </strong><span style="background-color:#${ratingColor};color:white"><strong>${rating}/5</strong></span>  ${ratingText}</li>
                                                                                                <li class="list-group-item"><strong>Cost for Two : </strong>${costOfTwo}</li>
                                                                                                <li class="list-group-item"><strong>Online Delivery : </strong>${onlineDelivery}</li>
                                                                                                <li class="list-group-item"><strong>Delivering Now : </strong>${deliveringNow}</li>
                                                                                                <li class="list-group-item"><strong>Table Reservation : </strong>${tableReservation}</li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                `
                                                                    $('#serachResult').html(restaurantDetail)
                                                                    var menu = data.menu_url
                                                                    var cuisinesPhotos = data.photos_url
                                                                    var zomatoLink = data.url
                                                                    var extraLink = `
                                                                                    <a href="${menu}" id="menu" target="_blank" class="btn btn-primary">menu</a>
                                                                                    <a href="${cuisinesPhotos}" id="cuisinesPhotos" target="_blank" class="btn btn-primary">cuisines photo</a>
                                                                                    <a href="${zomatoLink}" id="zomatoLink" target="_blank" class="btn btn-primary">zomato link</a>
                                                                                `
                                                                    $('#moreSearchResult').html(extraLink)
                                                                }
                                                            })
                                                        })
                                                    })
                                                }
                                            })
                                        }
                                    })
                                })
                                $('#page3').click(function () {
                                    $.ajax({
                                        method: "GET",
                                        crossDomain: true,
                                        url: `https://ipapi.co/json/`,
                                        dataType: "json",
                                        async: true,
                                        success: function (data) {
                                            var lat = data.latitude
                                            var lon = data.longitude
                                            $.ajax({
                                                method: "GET",
                                                crossDomain: true,
                                                url: `https://developers.zomato.com/api/v2.1/search?start=40&lat=${lat}&lon=${lon}7&category=${selectedCategory}&sort=rating`,
                                                dataType: "json",
                                                headers: {
                                                    "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                },
                                                success: function (data) {
                                                    var allRestaurents = data.restaurants
                                                    var output = ''
                                                    $.each(allRestaurents, function (index, restaurant) {
                                                        var thumb = restaurant.restaurant.thumb
                                                        if (thumb == "")
                                                            thumb = "images/Image-not-found.gif"
                                                        output += `
                                                                    <div class="searchResultRestaurant">
                                                                        <div>
                                                                            <img id="thumbImage" src="${thumb}" alt="Image Not Found" style="border:2px solid black">
                                                                            <div id="nameDetails">
                                                                                <h5 id="restaurantName">${restaurant.restaurant.name}</h5>
                                                                            </div>
                                                                            <div>
                                                                                <button id="restaurantId${restaurant.restaurant.id}" class="btn btn-primary">Restaurant Details</button>
                                                                            </div>    
                                                                        </div>
                                                                    </div>
                                                                `
                                                    })
                                                    $('#serachResult').html(output)
                                                    $.each(allRestaurents, function (index, restaurant) {
                                                        var resId = restaurant.restaurant.id
                                                        $('#restaurantId' + resId).click(function () {
                                                            $.ajax({
                                                                method: "GET",
                                                                crossDomain: true,
                                                                url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`,
                                                                dataType: "json",
                                                                async: true,
                                                                headers: {
                                                                    "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                                },
                                                                success: function (data) {
                                                                    if (data.thumb == "")
                                                                        var image = "images/Image-not-found.gif"
                                                                    else
                                                                        image = data.thumb
                                                                    var name = data.name
                                                                    var locality = data.location.locality_verbose
                                                                    var address = data.location.address
                                                                    var cuisines = data.cuisines
                                                                    var ratingColor = data.user_rating.rating_color
                                                                    var rating = data.user_rating.aggregate_rating
                                                                    var ratingText = data.user_rating.rating_text
                                                                    var costOfTwo = data.currency + " " + data.average_cost_for_two
                                                                    if (data.has_online_delivery == 1)
                                                                        var onlineDelivery = "YES"
                                                                    else
                                                                        onlineDelivery = "NO"
                                                                    if (data.is_delivering_now == 1)
                                                                        var deliveringNow = "YES"
                                                                    else
                                                                        deliveringNow = "NO"
                                                                    if (data.is_table_reservation_supported == 1)
                                                                        var tableReservation = "YES"
                                                                    else
                                                                        tableReservation = "NO"
                                                                    var restaurantDetail = `
                                                                                    <div class="row">
                                                                                        <div class="col-md-4">
                                                                                            <img src="${image}" alt="">
                                                                                        </div>
                                                                                        <div class="col-md-8">
                                                                                            <h2>${name}</h2>
                                                                                            <h6>${locality}</h6>
                                                                                            <ul class="list-group">
                                                                                                <li class="list-group-item"><strong>Address : </strong>${address}</li>
                                                                                                <li class="list-group-item"><strong>Cuisines : </strong>${cuisines}</li>
                                                                                                <li class="list-group-item"><strong>Rating : </strong><span style="background-color:#${ratingColor};color:white"><strong>${rating}/5</strong></span>  ${ratingText}</li>
                                                                                                <li class="list-group-item"><strong>Cost for Two : </strong>${costOfTwo}</li>
                                                                                                <li class="list-group-item"><strong>Online Delivery : </strong>${onlineDelivery}</li>
                                                                                                <li class="list-group-item"><strong>Delivering Now : </strong>${deliveringNow}</li>
                                                                                                <li class="list-group-item"><strong>Table Reservation : </strong>${tableReservation}</li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                `
                                                                    $('#serachResult').html(restaurantDetail)
                                                                    var menu = data.menu_url
                                                                    var cuisinesPhotos = data.photos_url
                                                                    var zomatoLink = data.url
                                                                    var extraLink = `
                                                                                    <a href="${menu}" id="menu" target="_blank" class="btn btn-primary">menu</a>
                                                                                    <a href="${cuisinesPhotos}" id="cuisinesPhotos" target="_blank" class="btn btn-primary">cuisines photo</a>
                                                                                    <a href="${zomatoLink}" id="zomatoLink" target="_blank" class="btn btn-primary">zomato link</a>
                                                                                `
                                                                    $('#moreSearchResult').html(extraLink)
                                                                }
                                                            })
                                                        })
                                                    })
                                                }
                                            })
                                        }
                                    })
                                })
                                $('#page4').click(function () {
                                    $.ajax({
                                        method: "GET",
                                        crossDomain: true,
                                        url: `https://ipapi.co/json/`,
                                        dataType: "json",
                                        async: true,
                                        success: function (data) {
                                            var lat = data.latitude
                                            var lon = data.longitude
                                            $.ajax({
                                                method: "GET",
                                                crossDomain: true,
                                                url: `https://developers.zomato.com/api/v2.1/search?start=60&lat=${lat}&lon=${lon}7&category=${selectedCategory}&sort=rating`,
                                                dataType: "json",
                                                headers: {
                                                    "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                },
                                                success: function (data) {
                                                    var allRestaurents = data.restaurants
                                                    var output = ''
                                                    $.each(allRestaurents, function (index, restaurant) {
                                                        var thumb = restaurant.restaurant.thumb
                                                        if (thumb == "")
                                                            thumb = "images/Image-not-found.gif"
                                                        output += `
                                                                    <div class="searchResultRestaurant">
                                                                        <div>
                                                                            <img id="thumbImage" src="${thumb}" alt="Image Not Found" style="border:2px solid black">
                                                                            <div id="nameDetails">
                                                                                <h5 id="restaurantName">${restaurant.restaurant.name}</h5>
                                                                            </div>
                                                                            <div>
                                                                                <button id="restaurantId${restaurant.restaurant.id}" class="btn btn-primary">Restaurant Details</button>
                                                                            </div>    
                                                                        </div>
                                                                    </div>
                                                                `
                                                    })
                                                    $('#serachResult').html(output)
                                                    $.each(allRestaurents, function (index, restaurant) {
                                                        var resId = restaurant.restaurant.id
                                                        $('#restaurantId' + resId).click(function () {
                                                            $.ajax({
                                                                method: "GET",
                                                                crossDomain: true,
                                                                url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`,
                                                                dataType: "json",
                                                                async: true,
                                                                headers: {
                                                                    "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                                },
                                                                success: function (data) {
                                                                    if (data.thumb == "")
                                                                        var image = "images/Image-not-found.gif"
                                                                    else
                                                                        image = data.thumb
                                                                    var name = data.name
                                                                    var locality = data.location.locality_verbose
                                                                    var address = data.location.address
                                                                    var cuisines = data.cuisines
                                                                    var ratingColor = data.user_rating.rating_color
                                                                    var rating = data.user_rating.aggregate_rating
                                                                    var ratingText = data.user_rating.rating_text
                                                                    var costOfTwo = data.currency + " " + data.average_cost_for_two
                                                                    if (data.has_online_delivery == 1)
                                                                        var onlineDelivery = "YES"
                                                                    else
                                                                        onlineDelivery = "NO"
                                                                    if (data.is_delivering_now == 1)
                                                                        var deliveringNow = "YES"
                                                                    else
                                                                        deliveringNow = "NO"
                                                                    if (data.is_table_reservation_supported == 1)
                                                                        var tableReservation = "YES"
                                                                    else
                                                                        tableReservation = "NO"
                                                                    var restaurantDetail = `
                                                                                    <div class="row">
                                                                                        <div class="col-md-4">
                                                                                            <img src="${image}" alt="">
                                                                                        </div>
                                                                                        <div class="col-md-8">
                                                                                            <h2>${name}</h2>
                                                                                            <h6>${locality}</h6>
                                                                                            <ul class="list-group">
                                                                                                <li class="list-group-item"><strong>Address : </strong>${address}</li>
                                                                                                <li class="list-group-item"><strong>Cuisines : </strong>${cuisines}</li>
                                                                                                <li class="list-group-item"><strong>Rating : </strong><span style="background-color:#${ratingColor};color:white"><strong>${rating}/5</strong></span>  ${ratingText}</li>
                                                                                                <li class="list-group-item"><strong>Cost for Two : </strong>${costOfTwo}</li>
                                                                                                <li class="list-group-item"><strong>Online Delivery : </strong>${onlineDelivery}</li>
                                                                                                <li class="list-group-item"><strong>Delivering Now : </strong>${deliveringNow}</li>
                                                                                                <li class="list-group-item"><strong>Table Reservation : </strong>${tableReservation}</li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                `
                                                                    $('#serachResult').html(restaurantDetail)
                                                                    var menu = data.menu_url
                                                                    var cuisinesPhotos = data.photos_url
                                                                    var zomatoLink = data.url
                                                                    var extraLink = `
                                                                                    <a href="${menu}" id="menu" target="_blank" class="btn btn-primary">menu</a>
                                                                                    <a href="${cuisinesPhotos}" id="cuisinesPhotos" target="_blank" class="btn btn-primary">cuisines photo</a>
                                                                                    <a href="${zomatoLink}" id="zomatoLink" target="_blank" class="btn btn-primary">zomato link</a>
                                                                                `
                                                                    $('#moreSearchResult').html(extraLink)
                                                                }
                                                            })
                                                        })
                                                    })
                                                }
                                            })
                                        }
                                    })
                                })
                                $('#page5').click(function () {
                                    $.ajax({
                                        method: "GET",
                                        crossDomain: true,
                                        url: `https://ipapi.co/json/`,
                                        dataType: "json",
                                        async: true,
                                        success: function (data) {
                                            var lat = data.latitude
                                            var lon = data.longitude
                                            $.ajax({
                                                method: "GET",
                                                crossDomain: true,
                                                url: `https://developers.zomato.com/api/v2.1/search?start=80&lat=${lat}&lon=${lon}7&category=${selectedCategory}&sort=rating`,
                                                dataType: "json",
                                                headers: {
                                                    "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                },
                                                success: function (data) {
                                                    var allRestaurents = data.restaurants
                                                    var output = ''
                                                    $.each(allRestaurents, function (index, restaurant) {
                                                        var thumb = restaurant.restaurant.thumb
                                                        if (thumb == "")
                                                            thumb = "images/Image-not-found.gif"
                                                        output += `
                                                                    <div class="searchResultRestaurant">
                                                                        <div>
                                                                            <img id="thumbImage" src="${thumb}" alt="Image Not Found" style="border:2px solid black">
                                                                            <div id="nameDetails">
                                                                                <h5 id="restaurantName">${restaurant.restaurant.name}</h5>
                                                                            </div>
                                                                            <div>
                                                                                <button id="restaurantId${restaurant.restaurant.id}" class="btn btn-primary">Restaurant Details</button>
                                                                            </div>    
                                                                        </div>
                                                                    </div>
                                                                `
                                                    })
                                                    $('#serachResult').html(output)
                                                    $.each(allRestaurents, function (index, restaurant) {
                                                        var resId = restaurant.restaurant.id
                                                        $('#restaurantId' + resId).click(function () {
                                                            $.ajax({
                                                                method: "GET",
                                                                crossDomain: true,
                                                                url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`,
                                                                dataType: "json",
                                                                async: true,
                                                                headers: {
                                                                    "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                                },
                                                                success: function (data) {
                                                                    if (data.thumb == "")
                                                                        var image = "images/Image-not-found.gif"
                                                                    else
                                                                        image = data.thumb
                                                                    var name = data.name
                                                                    var locality = data.location.locality_verbose
                                                                    var address = data.location.address
                                                                    var cuisines = data.cuisines
                                                                    var ratingColor = data.user_rating.rating_color
                                                                    var rating = data.user_rating.aggregate_rating
                                                                    var ratingText = data.user_rating.rating_text
                                                                    var costOfTwo = data.currency + " " + data.average_cost_for_two
                                                                    if (data.has_online_delivery == 1)
                                                                        var onlineDelivery = "YES"
                                                                    else
                                                                        onlineDelivery = "NO"
                                                                    if (data.is_delivering_now == 1)
                                                                        var deliveringNow = "YES"
                                                                    else
                                                                        deliveringNow = "NO"
                                                                    if (data.is_table_reservation_supported == 1)
                                                                        var tableReservation = "YES"
                                                                    else
                                                                        tableReservation = "NO"
                                                                    var restaurantDetail = `
                                                                                    <div class="row">
                                                                                        <div class="col-md-4">
                                                                                            <img src="${image}" alt="">
                                                                                        </div>
                                                                                        <div class="col-md-8">
                                                                                            <h2>${name}</h2>
                                                                                            <h6>${locality}</h6>
                                                                                            <ul class="list-group">
                                                                                                <li class="list-group-item"><strong>Address : </strong>${address}</li>
                                                                                                <li class="list-group-item"><strong>Cuisines : </strong>${cuisines}</li>
                                                                                                <li class="list-group-item"><strong>Rating : </strong><span style="background-color:#${ratingColor};color:white"><strong>${rating}/5</strong></span>  ${ratingText}</li>
                                                                                                <li class="list-group-item"><strong>Cost for Two : </strong>${costOfTwo}</li>
                                                                                                <li class="list-group-item"><strong>Online Delivery : </strong>${onlineDelivery}</li>
                                                                                                <li class="list-group-item"><strong>Delivering Now : </strong>${deliveringNow}</li>
                                                                                                <li class="list-group-item"><strong>Table Reservation : </strong>${tableReservation}</li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                `
                                                                    $('#serachResult').html(restaurantDetail)
                                                                    var menu = data.menu_url
                                                                    var cuisinesPhotos = data.photos_url
                                                                    var zomatoLink = data.url
                                                                    var extraLink = `
                                                                                    <a href="${menu}" id="menu" target="_blank" class="btn btn-primary">menu</a>
                                                                                    <a href="${cuisinesPhotos}" id="cuisinesPhotos" target="_blank" class="btn btn-primary">cuisines photo</a>
                                                                                    <a href="${zomatoLink}" id="zomatoLink" target="_blank" class="btn btn-primary">zomato link</a>
                                                                                `
                                                                    $('#moreSearchResult').html(extraLink)
                                                                }
                                                            })
                                                        })
                                                    })
                                                }
                                            })
                                        }
                                    })
                                })
                            },
                            error: function () {
                                console.log("ERROR")
                            }
                        })
                    }
                })
            },
            error: function () {
                console.log("ERROR")
            }
        })
    })

    //by city

    $('#searchByCity').click(function () {
        var enteredCity = $('#enterCity').val()
        var selectedCategory = $('#allCat :selected').attr('value')
        if (enteredCity == "") {
            alert("Please Enter any City Name")
        }
        else if (selectedCategory == undefined) {
            alert("Please Select any Category")
        }
        else {
            $.ajax({
                method: "GET",
                crossDomain: true,
                url: `https://developers.zomato.com/api/v2.1/cities?q=${enteredCity}&count=5`,
                dataType: "json",
                async: true,
                headers: {
                    "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                },
                success: function (data) {
                    if (data.location_suggestions.length > 1) {
                        var allSuggestions = data.location_suggestions
                        var output = ''
                        $.each(allSuggestions, function (index, data) {
                            output += `
                                <div id="location${data.id}" class="card border-primary mb-3 locationSuggestions" style="max-width: 20rem;">
                                    <div class="card-header"><h2><strong>City : </strong>${data.name}</h2></div>
                                        <div class="card-body">
                                            <h4 class="card-title"><strong>Country : </strong>${data.country_name}</h4>
                                            <img id="flagImage" src="${data.country_flag_url}">
                                        </div>
                                    </div>
                                </div>
                                `
                        })
                        $('#serachResult').html(output)
                        $.each(allSuggestions, function (index, data) {
                            $('#location' + data.id).click(function () {
                                var cityId = data.id
                                $.ajax({
                                    method: "GET",
                                    crossDomain: true,
                                    url: `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&category=${selectedCategory}`,
                                    dataType: "json",
                                    async: true,
                                    headers: {
                                        "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                    },
                                    success: function (data) {
                                        var allRestaurents = data.restaurants
                                        var output = ''
                                        $.each(allRestaurents, function (index, restaurant) {
                                            var thumb = restaurant.restaurant.thumb
                                            if (thumb == "")
                                                thumb = "images/Image-not-found.gif"
                                            output += `
                                                    <div class="searchResultRestaurant">
                                                        <div>
                                                            <img id="thumbImage" src="${thumb}" alt="Image Not Found" style="border:2px solid black">
                                                        <div id="nameDetails">
                                                            <h5 id="restaurantName">${restaurant.restaurant.name}</h5>
                                                        </div>
                                                        <div>
                                                            <button id="restaurantId${restaurant.restaurant.id}" class="btn btn-primary">Restaurant Details</button>
                                                        </div>    
                                                    </div>
                                                </div>
                                                `
                                        })
                                        $('#serachResult').html(output)

                                        var resultFound = data.results_found
                                        var totalResult = data.results_shown
                                        var totalResultPage = Math.ceil(resultFound / totalResult)
                                        if (resultFound > totalResult) {
                                            var allPageResult = ''
                                            for (i = 1; i <= totalResultPage && i <= 5; i++) {
                                                allPageResult += `
                                                        <button id="page${i}" class="btn btn-primary">${i}</button>
                                                    `
                                            }
                                        }
                                        $('#moreSearchResult').html(allPageResult)
                                        $('#page1').click(function () {
                                            $.ajax({
                                                method: "GET",
                                                crossDomain: true,
                                                url: `https://ipapi.co/json/`,
                                                dataType: "json",
                                                async: true,
                                                success: function (data) {
                                                    var lat = data.latitude
                                                    var lon = data.longitude
                                                    $.ajax({
                                                        method: "GET",
                                                        crossDomain: true,
                                                        url: `https://developers.zomato.com/api/v2.1/search?&lat=${lat}&lon=${lon}7&category=${selectedCategory}&sort=rating`,
                                                        dataType: "json",
                                                        headers: {
                                                            "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                        },
                                                        success: function (data) {
                                                            var allRestaurents = data.restaurants
                                                            var output = ''
                                                            $.each(allRestaurents, function (index, restaurant) {
                                                                var thumb = restaurant.restaurant.thumb
                                                                if (thumb == "")
                                                                    thumb = "images/Image-not-found.gif"
                                                                output += `
                                                                                <div class="searchResultRestaurant">
                                                                                    <div>
                                                                                        <img id="thumbImage" src="${thumb}" alt="Image Not Found" style="border:2px solid black">
                                                                                        <div id="nameDetails">
                                                                                            <h5 id="restaurantName">${restaurant.restaurant.name}</h5>
                                                                                        </div>
                                                                                        <div>
                                                                                            <button id="restaurantId${restaurant.restaurant.id}" class="btn btn-primary">Restaurant Details</button>
                                                                                        </div>    
                                                                                    </div>
                                                                                </div>
                                                                            `
                                                            })
                                                            $('#serachResult').html(output)
                                                            $.each(allRestaurents, function (index, restaurant) {
                                                                var resId = restaurant.restaurant.id
                                                                $('#restaurantId' + resId).click(function () {
                                                                    $.ajax({
                                                                        method: "GET",
                                                                        crossDomain: true,
                                                                        url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`,
                                                                        dataType: "json",
                                                                        async: true,
                                                                        headers: {
                                                                            "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                                        },
                                                                        success: function (data) {
                                                                            if (data.thumb == "")
                                                                                var image = "images/Image-not-found.gif"
                                                                            else
                                                                                image = data.thumb
                                                                            var name = data.name
                                                                            var locality = data.location.locality_verbose
                                                                            var address = data.location.address
                                                                            var cuisines = data.cuisines
                                                                            var ratingColor = data.user_rating.rating_color
                                                                            var rating = data.user_rating.aggregate_rating
                                                                            var ratingText = data.user_rating.rating_text
                                                                            var costOfTwo = data.currency + " " + data.average_cost_for_two
                                                                            if (data.has_online_delivery == 1)
                                                                                var onlineDelivery = "YES"
                                                                            else
                                                                                onlineDelivery = "NO"
                                                                            if (data.is_delivering_now == 1)
                                                                                var deliveringNow = "YES"
                                                                            else
                                                                                deliveringNow = "NO"
                                                                            if (data.is_table_reservation_supported == 1)
                                                                                var tableReservation = "YES"
                                                                            else
                                                                                tableReservation = "NO"
                                                                            var restaurantDetail = `
                                                                                                <div class="row">
                                                                                                    <div class="col-md-4">
                                                                                                        <img src="${image}" alt="">
                                                                                                    </div>
                                                                                                    <div class="col-md-8">
                                                                                                        <h2>${name}</h2>
                                                                                                        <h6>${locality}</h6>
                                                                                                        <ul class="list-group">
                                                                                                            <li class="list-group-item"><strong>Address : </strong>${address}</li>
                                                                                                            <li class="list-group-item"><strong>Cuisines : </strong>${cuisines}</li>
                                                                                                            <li class="list-group-item"><strong>Rating : </strong><span style="background-color:#${ratingColor};color:white"><strong>${rating}/5</strong></span>  ${ratingText}</li>
                                                                                                            <li class="list-group-item"><strong>Cost for Two : </strong>${costOfTwo}</li>
                                                                                                            <li class="list-group-item"><strong>Online Delivery : </strong>${onlineDelivery}</li>
                                                                                                            <li class="list-group-item"><strong>Delivering Now : </strong>${deliveringNow}</li>
                                                                                                            <li class="list-group-item"><strong>Table Reservation : </strong>${tableReservation}</li>
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                </div>
                                                                                            `
                                                                            $('#serachResult').html(restaurantDetail)
                                                                            var menu = data.menu_url
                                                                            var cuisinesPhotos = data.photos_url
                                                                            var zomatoLink = data.url
                                                                            var extraLink = `
                                                                                                <a href="${menu}" id="menu" target="_blank" class="btn btn-primary">menu</a>
                                                                                                <a href="${cuisinesPhotos}" id="cuisinesPhotos" target="_blank" class="btn btn-primary">cuisines photo</a>
                                                                                                <a href="${zomatoLink}" id="zomatoLink" target="_blank" class="btn btn-primary">zomato link</a>
                                                                                            `
                                                                            $('#moreSearchResult').html(extraLink)
                                                                        }
                                                                    })
                                                                })
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        })
                                        $('#page2').click(function () {
                                            $.ajax({
                                                method: "GET",
                                                crossDomain: true,
                                                url: `https://ipapi.co/json/`,
                                                dataType: "json",
                                                async: true,
                                                success: function (data) {
                                                    var lat = data.latitude
                                                    var lon = data.longitude
                                                    $.ajax({
                                                        method: "GET",
                                                        crossDomain: true,
                                                        url: `https://developers.zomato.com/api/v2.1/search?start=20&lat=${lat}&lon=${lon}7&category=${selectedCategory}&sort=rating`,
                                                        dataType: "json",
                                                        headers: {
                                                            "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                        },
                                                        success: function (data) {
                                                            var allRestaurents = data.restaurants
                                                            var output = ''
                                                            $.each(allRestaurents, function (index, restaurant) {
                                                                var thumb = restaurant.restaurant.thumb
                                                                if (thumb == "")
                                                                    thumb = "images/Image-not-found.gif"
                                                                output += `
                                                                                <div class="searchResultRestaurant">
                                                                                    <div>
                                                                                        <img id="thumbImage" src="${thumb}" alt="Image Not Found" style="border:2px solid black">
                                                                                        <div id="nameDetails">
                                                                                            <h5 id="restaurantName">${restaurant.restaurant.name}</h5>
                                                                                        </div>
                                                                                        <div>
                                                                                            <button id="restaurantId${restaurant.restaurant.id}" class="btn btn-primary">Restaurant Details</button>
                                                                                        </div>    
                                                                                    </div>
                                                                                </div>
                                                                            `
                                                            })
                                                            $('#serachResult').html(output)
                                                            $.each(allRestaurents, function (index, restaurant) {
                                                                var resId = restaurant.restaurant.id
                                                                $('#restaurantId' + resId).click(function () {
                                                                    $.ajax({
                                                                        method: "GET",
                                                                        crossDomain: true,
                                                                        url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`,
                                                                        dataType: "json",
                                                                        async: true,
                                                                        headers: {
                                                                            "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                                        },
                                                                        success: function (data) {
                                                                            if (data.thumb == "")
                                                                                var image = "images/Image-not-found.gif"
                                                                            else
                                                                                image = data.thumb
                                                                            var name = data.name
                                                                            var locality = data.location.locality_verbose
                                                                            var address = data.location.address
                                                                            var cuisines = data.cuisines
                                                                            var ratingColor = data.user_rating.rating_color
                                                                            var rating = data.user_rating.aggregate_rating
                                                                            var ratingText = data.user_rating.rating_text
                                                                            var costOfTwo = data.currency + " " + data.average_cost_for_two
                                                                            if (data.has_online_delivery == 1)
                                                                                var onlineDelivery = "YES"
                                                                            else
                                                                                onlineDelivery = "NO"
                                                                            if (data.is_delivering_now == 1)
                                                                                var deliveringNow = "YES"
                                                                            else
                                                                                deliveringNow = "NO"
                                                                            if (data.is_table_reservation_supported == 1)
                                                                                var tableReservation = "YES"
                                                                            else
                                                                                tableReservation = "NO"
                                                                            var restaurantDetail = `
                                                                                                <div class="row">
                                                                                                    <div class="col-md-4">
                                                                                                        <img src="${image}" alt="">
                                                                                                    </div>
                                                                                                    <div class="col-md-8">
                                                                                                        <h2>${name}</h2>
                                                                                                        <h6>${locality}</h6>
                                                                                                        <ul class="list-group">
                                                                                                            <li class="list-group-item"><strong>Address : </strong>${address}</li>
                                                                                                            <li class="list-group-item"><strong>Cuisines : </strong>${cuisines}</li>
                                                                                                            <li class="list-group-item"><strong>Rating : </strong><span style="background-color:#${ratingColor};color:white"><strong>${rating}/5</strong></span>  ${ratingText}</li>
                                                                                                            <li class="list-group-item"><strong>Cost for Two : </strong>${costOfTwo}</li>
                                                                                                            <li class="list-group-item"><strong>Online Delivery : </strong>${onlineDelivery}</li>
                                                                                                            <li class="list-group-item"><strong>Delivering Now : </strong>${deliveringNow}</li>
                                                                                                            <li class="list-group-item"><strong>Table Reservation : </strong>${tableReservation}</li>
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                </div>
                                                                                            `
                                                                            $('#serachResult').html(restaurantDetail)
                                                                            var menu = data.menu_url
                                                                            var cuisinesPhotos = data.photos_url
                                                                            var zomatoLink = data.url
                                                                            var extraLink = `
                                                                                                <a href="${menu}" id="menu" target="_blank" class="btn btn-primary">menu</a>
                                                                                                <a href="${cuisinesPhotos}" id="cuisinesPhotos" target="_blank" class="btn btn-primary">cuisines photo</a>
                                                                                                <a href="${zomatoLink}" id="zomatoLink" target="_blank" class="btn btn-primary">zomato link</a>
                                                                                            `
                                                                            $('#moreSearchResult').html(extraLink)
                                                                        }
                                                                    })
                                                                })
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        })
                                        $('#page3').click(function () {
                                            $.ajax({
                                                method: "GET",
                                                crossDomain: true,
                                                url: `https://ipapi.co/json/`,
                                                dataType: "json",
                                                async: true,
                                                success: function (data) {
                                                    var lat = data.latitude
                                                    var lon = data.longitude
                                                    $.ajax({
                                                        method: "GET",
                                                        crossDomain: true,
                                                        url: `https://developers.zomato.com/api/v2.1/search?start=40&lat=${lat}&lon=${lon}7&category=${selectedCategory}&sort=rating`,
                                                        dataType: "json",
                                                        headers: {
                                                            "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                        },
                                                        success: function (data) {
                                                            var allRestaurents = data.restaurants
                                                            var output = ''
                                                            $.each(allRestaurents, function (index, restaurant) {
                                                                var thumb = restaurant.restaurant.thumb
                                                                if (thumb == "")
                                                                    thumb = "images/Image-not-found.gif"
                                                                output += `
                                                                                <div class="searchResultRestaurant">
                                                                                    <div>
                                                                                        <img id="thumbImage" src="${thumb}" alt="Image Not Found" style="border:2px solid black">
                                                                                        <div id="nameDetails">
                                                                                            <h5 id="restaurantName">${restaurant.restaurant.name}</h5>
                                                                                        </div>
                                                                                        <div>
                                                                                            <button id="restaurantId${restaurant.restaurant.id}" class="btn btn-primary">Restaurant Details</button>
                                                                                        </div>    
                                                                                    </div>
                                                                                </div>
                                                                            `
                                                            })
                                                            $('#serachResult').html(output)
                                                            $.each(allRestaurents, function (index, restaurant) {
                                                                var resId = restaurant.restaurant.id
                                                                $('#restaurantId' + resId).click(function () {
                                                                    $.ajax({
                                                                        method: "GET",
                                                                        crossDomain: true,
                                                                        url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`,
                                                                        dataType: "json",
                                                                        async: true,
                                                                        headers: {
                                                                            "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                                        },
                                                                        success: function (data) {
                                                                            if (data.thumb == "")
                                                                                var image = "images/Image-not-found.gif"
                                                                            else
                                                                                image = data.thumb
                                                                            var name = data.name
                                                                            var locality = data.location.locality_verbose
                                                                            var address = data.location.address
                                                                            var cuisines = data.cuisines
                                                                            var ratingColor = data.user_rating.rating_color
                                                                            var rating = data.user_rating.aggregate_rating
                                                                            var ratingText = data.user_rating.rating_text
                                                                            var costOfTwo = data.currency + " " + data.average_cost_for_two
                                                                            if (data.has_online_delivery == 1)
                                                                                var onlineDelivery = "YES"
                                                                            else
                                                                                onlineDelivery = "NO"
                                                                            if (data.is_delivering_now == 1)
                                                                                var deliveringNow = "YES"
                                                                            else
                                                                                deliveringNow = "NO"
                                                                            if (data.is_table_reservation_supported == 1)
                                                                                var tableReservation = "YES"
                                                                            else
                                                                                tableReservation = "NO"
                                                                            var restaurantDetail = `
                                                                                                <div class="row">
                                                                                                    <div class="col-md-4">
                                                                                                        <img src="${image}" alt="">
                                                                                                    </div>
                                                                                                    <div class="col-md-8">
                                                                                                        <h2>${name}</h2>
                                                                                                        <h6>${locality}</h6>
                                                                                                        <ul class="list-group">
                                                                                                            <li class="list-group-item"><strong>Address : </strong>${address}</li>
                                                                                                            <li class="list-group-item"><strong>Cuisines : </strong>${cuisines}</li>
                                                                                                            <li class="list-group-item"><strong>Rating : </strong><span style="background-color:#${ratingColor};color:white"><strong>${rating}/5</strong></span>  ${ratingText}</li>
                                                                                                            <li class="list-group-item"><strong>Cost for Two : </strong>${costOfTwo}</li>
                                                                                                            <li class="list-group-item"><strong>Online Delivery : </strong>${onlineDelivery}</li>
                                                                                                            <li class="list-group-item"><strong>Delivering Now : </strong>${deliveringNow}</li>
                                                                                                            <li class="list-group-item"><strong>Table Reservation : </strong>${tableReservation}</li>
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                </div>
                                                                                            `
                                                                            $('#serachResult').html(restaurantDetail)
                                                                            var menu = data.menu_url
                                                                            var cuisinesPhotos = data.photos_url
                                                                            var zomatoLink = data.url
                                                                            var extraLink = `
                                                                                                <a href="${menu}" id="menu" target="_blank" class="btn btn-primary">menu</a>
                                                                                                <a href="${cuisinesPhotos}" id="cuisinesPhotos" target="_blank" class="btn btn-primary">cuisines photo</a>
                                                                                                <a href="${zomatoLink}" id="zomatoLink" target="_blank" class="btn btn-primary">zomato link</a>
                                                                                            `
                                                                            $('#moreSearchResult').html(extraLink)
                                                                        }
                                                                    })
                                                                })
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        })
                                        $('#page4').click(function () {
                                            $.ajax({
                                                method: "GET",
                                                crossDomain: true,
                                                url: `https://ipapi.co/json/`,
                                                dataType: "json",
                                                async: true,
                                                success: function (data) {
                                                    var lat = data.latitude
                                                    var lon = data.longitude
                                                    $.ajax({
                                                        method: "GET",
                                                        crossDomain: true,
                                                        url: `https://developers.zomato.com/api/v2.1/search?start=60&lat=${lat}&lon=${lon}7&category=${selectedCategory}&sort=rating`,
                                                        dataType: "json",
                                                        headers: {
                                                            "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                        },
                                                        success: function (data) {
                                                            var allRestaurents = data.restaurants
                                                            var output = ''
                                                            $.each(allRestaurents, function (index, restaurant) {
                                                                var thumb = restaurant.restaurant.thumb
                                                                if (thumb == "")
                                                                    thumb = "images/Image-not-found.gif"
                                                                output += `
                                                                                <div class="searchResultRestaurant">
                                                                                    <div>
                                                                                        <img id="thumbImage" src="${thumb}" alt="Image Not Found" style="border:2px solid black">
                                                                                        <div id="nameDetails">
                                                                                            <h5 id="restaurantName">${restaurant.restaurant.name}</h5>
                                                                                        </div>
                                                                                        <div>
                                                                                            <button id="restaurantId${restaurant.restaurant.id}" class="btn btn-primary">Restaurant Details</button>
                                                                                        </div>    
                                                                                    </div>
                                                                                </div>
                                                                            `
                                                            })
                                                            $('#serachResult').html(output)
                                                            $.each(allRestaurents, function (index, restaurant) {
                                                                var resId = restaurant.restaurant.id
                                                                $('#restaurantId' + resId).click(function () {
                                                                    $.ajax({
                                                                        method: "GET",
                                                                        crossDomain: true,
                                                                        url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`,
                                                                        dataType: "json",
                                                                        async: true,
                                                                        headers: {
                                                                            "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                                        },
                                                                        success: function (data) {
                                                                            if (data.thumb == "")
                                                                                var image = "images/Image-not-found.gif"
                                                                            else
                                                                                image = data.thumb
                                                                            var name = data.name
                                                                            var locality = data.location.locality_verbose
                                                                            var address = data.location.address
                                                                            var cuisines = data.cuisines
                                                                            var ratingColor = data.user_rating.rating_color
                                                                            var rating = data.user_rating.aggregate_rating
                                                                            var ratingText = data.user_rating.rating_text
                                                                            var costOfTwo = data.currency + " " + data.average_cost_for_two
                                                                            if (data.has_online_delivery == 1)
                                                                                var onlineDelivery = "YES"
                                                                            else
                                                                                onlineDelivery = "NO"
                                                                            if (data.is_delivering_now == 1)
                                                                                var deliveringNow = "YES"
                                                                            else
                                                                                deliveringNow = "NO"
                                                                            if (data.is_table_reservation_supported == 1)
                                                                                var tableReservation = "YES"
                                                                            else
                                                                                tableReservation = "NO"
                                                                            var restaurantDetail = `
                                                                                                <div class="row">
                                                                                                    <div class="col-md-4">
                                                                                                        <img src="${image}" alt="">
                                                                                                    </div>
                                                                                                    <div class="col-md-8">
                                                                                                        <h2>${name}</h2>
                                                                                                        <h6>${locality}</h6>
                                                                                                        <ul class="list-group">
                                                                                                            <li class="list-group-item"><strong>Address : </strong>${address}</li>
                                                                                                            <li class="list-group-item"><strong>Cuisines : </strong>${cuisines}</li>
                                                                                                            <li class="list-group-item"><strong>Rating : </strong><span style="background-color:#${ratingColor};color:white"><strong>${rating}/5</strong></span>  ${ratingText}</li>
                                                                                                            <li class="list-group-item"><strong>Cost for Two : </strong>${costOfTwo}</li>
                                                                                                            <li class="list-group-item"><strong>Online Delivery : </strong>${onlineDelivery}</li>
                                                                                                            <li class="list-group-item"><strong>Delivering Now : </strong>${deliveringNow}</li>
                                                                                                            <li class="list-group-item"><strong>Table Reservation : </strong>${tableReservation}</li>
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                </div>
                                                                                            `
                                                                            $('#serachResult').html(restaurantDetail)
                                                                            var menu = data.menu_url
                                                                            var cuisinesPhotos = data.photos_url
                                                                            var zomatoLink = data.url
                                                                            var extraLink = `
                                                                                                <a href="${menu}" id="menu" target="_blank" class="btn btn-primary">menu</a>
                                                                                                <a href="${cuisinesPhotos}" id="cuisinesPhotos" target="_blank" class="btn btn-primary">cuisines photo</a>
                                                                                                <a href="${zomatoLink}" id="zomatoLink" target="_blank" class="btn btn-primary">zomato link</a>
                                                                                            `
                                                                            $('#moreSearchResult').html(extraLink)
                                                                        }
                                                                    })
                                                                })
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        })
                                        $('#page5').click(function () {
                                            $.ajax({
                                                method: "GET",
                                                crossDomain: true,
                                                url: `https://ipapi.co/json/`,
                                                dataType: "json",
                                                async: true,
                                                success: function (data) {
                                                    var lat = data.latitude
                                                    var lon = data.longitude
                                                    $.ajax({
                                                        method: "GET",
                                                        crossDomain: true,
                                                        url: `https://developers.zomato.com/api/v2.1/search?start=80&lat=${lat}&lon=${lon}7&category=${selectedCategory}&sort=rating`,
                                                        dataType: "json",
                                                        headers: {
                                                            "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                        },
                                                        success: function (data) {
                                                            var allRestaurents = data.restaurants
                                                            var output = ''
                                                            $.each(allRestaurents, function (index, restaurant) {
                                                                var thumb = restaurant.restaurant.thumb
                                                                if (thumb == "")
                                                                    thumb = "images/Image-not-found.gif"
                                                                output += `
                                                                                <div class="searchResultRestaurant">
                                                                                    <div>
                                                                                        <img id="thumbImage" src="${thumb}" alt="Image Not Found" style="border:2px solid black">
                                                                                        <div id="nameDetails">
                                                                                            <h5 id="restaurantName">${restaurant.restaurant.name}</h5>
                                                                                        </div>
                                                                                        <div>
                                                                                            <button id="restaurantId${restaurant.restaurant.id}" class="btn btn-primary">Restaurant Details</button>
                                                                                        </div>    
                                                                                    </div>
                                                                                </div>
                                                                            `
                                                            })
                                                            $('#serachResult').html(output)
                                                            $.each(allRestaurents, function (index, restaurant) {
                                                                var resId = restaurant.restaurant.id
                                                                $('#restaurantId' + resId).click(function () {
                                                                    $.ajax({
                                                                        method: "GET",
                                                                        crossDomain: true,
                                                                        url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`,
                                                                        dataType: "json",
                                                                        async: true,
                                                                        headers: {
                                                                            "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                                        },
                                                                        success: function (data) {
                                                                            if (data.thumb == "")
                                                                                var image = "images/Image-not-found.gif"
                                                                            else
                                                                                image = data.thumb
                                                                            var name = data.name
                                                                            var locality = data.location.locality_verbose
                                                                            var address = data.location.address
                                                                            var cuisines = data.cuisines
                                                                            var ratingColor = data.user_rating.rating_color
                                                                            var rating = data.user_rating.aggregate_rating
                                                                            var ratingText = data.user_rating.rating_text
                                                                            var costOfTwo = data.currency + " " + data.average_cost_for_two
                                                                            if (data.has_online_delivery == 1)
                                                                                var onlineDelivery = "YES"
                                                                            else
                                                                                onlineDelivery = "NO"
                                                                            if (data.is_delivering_now == 1)
                                                                                var deliveringNow = "YES"
                                                                            else
                                                                                deliveringNow = "NO"
                                                                            if (data.is_table_reservation_supported == 1)
                                                                                var tableReservation = "YES"
                                                                            else
                                                                                tableReservation = "NO"
                                                                            var restaurantDetail = `
                                                                                                <div class="row">
                                                                                                    <div class="col-md-4">
                                                                                                        <img src="${image}" alt="">
                                                                                                    </div>
                                                                                                    <div class="col-md-8">
                                                                                                        <h2>${name}</h2>
                                                                                                        <h6>${locality}</h6>
                                                                                                        <ul class="list-group">
                                                                                                            <li class="list-group-item"><strong>Address : </strong>${address}</li>
                                                                                                            <li class="list-group-item"><strong>Cuisines : </strong>${cuisines}</li>
                                                                                                            <li class="list-group-item"><strong>Rating : </strong><span style="background-color:#${ratingColor};color:white"><strong>${rating}/5</strong></span>  ${ratingText}</li>
                                                                                                            <li class="list-group-item"><strong>Cost for Two : </strong>${costOfTwo}</li>
                                                                                                            <li class="list-group-item"><strong>Online Delivery : </strong>${onlineDelivery}</li>
                                                                                                            <li class="list-group-item"><strong>Delivering Now : </strong>${deliveringNow}</li>
                                                                                                            <li class="list-group-item"><strong>Table Reservation : </strong>${tableReservation}</li>
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                </div>
                                                                                            `
                                                                            $('#serachResult').html(restaurantDetail)
                                                                            var menu = data.menu_url
                                                                            var cuisinesPhotos = data.photos_url
                                                                            var zomatoLink = data.url
                                                                            var extraLink = `
                                                                                                <a href="${menu}" id="menu" target="_blank" class="btn btn-primary">menu</a>
                                                                                                <a href="${cuisinesPhotos}" id="cuisinesPhotos" target="_blank" class="btn btn-primary">cuisines photo</a>
                                                                                                <a href="${zomatoLink}" id="zomatoLink" target="_blank" class="btn btn-primary">zomato link</a>
                                                                                            `
                                                                            $('#moreSearchResult').html(extraLink)
                                                                        }
                                                                    })
                                                                })
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        })
                                        $.each(allRestaurents, function (index, restaurant) {
                                            var resId = restaurant.restaurant.id
                                            $('#restaurantId' + resId).click(function () {
                                                $.ajax({
                                                    method: "GET",
                                                    crossDomain: true,
                                                    url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${resId}`,
                                                    dataType: "json",
                                                    async: true,
                                                    headers: {
                                                        "user-key": "0a661374a6b58eb2fa84142d27fe81ca"
                                                    },
                                                    success: function (data) {
                                                        if (data.thumb == "")
                                                            var image = "images/Image-not-found.gif"
                                                        else
                                                            image = data.thumb
                                                        var name = data.name
                                                        var locality = data.location.locality_verbose
                                                        var address = data.location.address
                                                        var cuisines = data.cuisines
                                                        var ratingColor = data.user_rating.rating_color
                                                        var rating = data.user_rating.aggregate_rating
                                                        var ratingText = data.user_rating.rating_text
                                                        var costOfTwo = data.currency + " " + data.average_cost_for_two
                                                        if (data.has_online_delivery == 1)
                                                            var onlineDelivery = "YES"
                                                        else
                                                            onlineDelivery = "NO"
                                                        if (data.is_delivering_now == 1)
                                                            var deliveringNow = "YES"
                                                        else
                                                            deliveringNow = "NO"
                                                        if (data.is_table_reservation_supported == 1)
                                                            var tableReservation = "YES"
                                                        else
                                                            tableReservation = "NO"
                                                        var restaurantDetail = `
                                                                            <div class="row">
                                                                                <div class="col-md-4">
                                                                                    <img src="${image}" alt="">
                                                                                </div>
                                                                                <div class="col-md-8">
                                                                                    <h2>${name}</h2>
                                                                                    <h6>${locality}</h6>
                                                                                    <ul class="list-group">
                                                                                        <li class="list-group-item"><strong>Address : </strong>${address}</li>
                                                                                        <li class="list-group-item"><strong>Cuisines : </strong>${cuisines}</li>
                                                                                        <li class="list-group-item"><strong>Rating : </strong><span style="background-color:#${ratingColor};color:white"><strong>${rating}/5</strong></span>  ${ratingText}</li>
                                                                                        <li class="list-group-item"><strong>Cost for Two : </strong>${costOfTwo}</li>
                                                                                        <li class="list-group-item"><strong>Online Delivery : </strong>${onlineDelivery}</li>
                                                                                        <li class="list-group-item"><strong>Delivering Now : </strong>${deliveringNow}</li>
                                                                                        <li class="list-group-item"><strong>Table Reservation : </strong>${tableReservation}</li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        `
                                                        $('#serachResult').html(restaurantDetail)
                                                        var menu = data.menu_url
                                                        var cuisinesPhotos = data.photos_url
                                                        var zomatoLink = data.url
                                                        var extraLink = `
                                                                            <a href="${menu}" id="menu" target="_blank" class="btn btn-primary">menu</a>
                                                                            <a href="${cuisinesPhotos}" id="cuisinesPhotos" target="_blank" class="btn btn-primary">cuisines photo</a>
                                                                            <a href="${zomatoLink}" id="zomatoLink" target="_blank" class="btn btn-primary">zomato link</a>
                                                                        `
                                                        $('#moreSearchResult').html(extraLink)

                                                    }
                                                })
                                            })
                                        })
                                    },
                                    error: function () {
                                        console.log("ERROR")
                                    }
                                })
                            })
                        })
                    }
                },
                error: function () {
                    console.log("ERROR")
                }
            })
        }
    })
})