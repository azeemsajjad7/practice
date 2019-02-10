//getting player name by search button

$(document).ready(function () {
    $('#searchBtn').on('click', function (event) {
        let searchText = $('#searchText').val()
        getPlayers(searchText)
        event.preventDefault()
    })
})

//getting player name by enter button

$(document).ready(function () {
    $('#searchForm').on('submit', function (event) {
        let searchText = $('#searchText').val()
        getPlayers(searchText)
        event.preventDefault()
    })
})

//getplayer function

function getPlayers(searchText) {
    axios.get(`https://cricapi.com/api/playerFinder?apikey=oH2YwI38FXh3VMLZL2ITLIqeZS82&name=${searchText}`)
        .then(function (response) {
            let players = response.data.data
            let output = ''
            $.each(players, function (index, player) {
                imageURL = `https://www.cricapi.com/playerpic/${player.pid}.jpg`
                output += `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <img src="${imageURL}" src="not-found.png">
                            <div id="nameDetails">
                                <h5 id="playerName">${player.name}</h5>
                                <h6 id="playerFullNmae">${player.fullName}</h6>
                            </div>
                            <a onclick="playerSelected('${player.pid}')" class="btn btn-primary" href="#">Player Details</a>   
                        </div>
                    </div>
                `
            })
            $('#players').html(output)
        })
        .catch(function (err) {
            console.log(err)
        })
}

//player detail function

function playerSelected(id) {
    sessionStorage.setItem('playerId', id)
    window.location = 'playerDetail.html'
    return false
}

function getPlayer() {
    let playerId = sessionStorage.getItem('playerId')
    axios.get(`https://cricapi.com/api/playerStats?apikey=oH2YwI38FXh3VMLZL2ITLIqeZS82&pid=${playerId}`)
        .then(function (response) {
            let output = `
                <div class="row">
                    <div class="col-md-4">
                    <img id="playerPic" src="${response.data.imageURL}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                    <h2>${response.data.name}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Full Name : </strong>${response.data.fullName}</li>
                            <li class="list-group-item"><strong>country : </strong>${response.data.country}</li>
                            <li class="list-group-item"><strong>Born : </strong>${response.data.born}</li>
                            <li class="list-group-item"><strong>Age : </strong>${response.data.currentAge}</li>
                            <li class="list-group-item"><strong>Batting Style : </strong>${response.data.battingStyle}</li>
                            <li class="list-group-item"><strong>Bowling Style : </strong>${response.data.bowlingStyle}</li>
                            <li class="list-group-item"><strong>Playing Role : </strong>${response.data.playingRole}</li>
                            <li class="list-group-item"><strong>Major Teams : </strong>${response.data.majorTeams}</li>
                        </ul>
                    </div>
                </div>
                <div class="row2">
                    <div>
                        <h3>Profile</h3>
                        <p id="playerProfile">${response.data.profile}</p>                        
                        <hr>                        
                    </div>  
                    <div>
                        <h4>Batting Records</h4>
                        <table class="table table-dark">
                            <tr>
                                <th></th>
                                <th>ODI</th>
                                <th>Test</th>
                                <th>T20</th>
                                <th>First Class</th>
                                <th>listA</th>
                            </tr>
                            <tr>
                                <th>Match</th>
                                <td>${response.data.data.batting.ODIs.Mat}</td>
                                <td>${response.data.data.batting.tests.Mat}</td>
                                <td>${response.data.data.batting.T20Is.Mat}</td>
                                <td>${response.data.data.batting.firstClass.Mat}</td>
                                <td>${response.data.data.batting.listA.Mat}</td>
                            </tr>
                            <tr>
                                <th>Innings</th>
                                <td>${response.data.data.batting.ODIs.Inns}</td>
                                <td>${response.data.data.batting.tests.Inns}</td>
                                <td>${response.data.data.batting.T20Is.Inns}</td>
                                <td>${response.data.data.batting.firstClass.Inns}</td>
                                <td>${response.data.data.batting.listA.Inns}</td>
                            </tr>
                            <tr>
                                <th>Not Out</th>
                                <td>${response.data.data.batting.ODIs.NO}</td>
                                <td>${response.data.data.batting.tests.NO}</td>
                                <td>${response.data.data.batting.T20Is.NO}</td>
                                <td>${response.data.data.batting.firstClass.NO}</td>
                                <td>${response.data.data.batting.listA.NO}</td>
                            </tr>
                            <tr>
                                <th>Runs</th>
                                <td>${response.data.data.batting.ODIs.Runs}</td>
                                <td>${response.data.data.batting.tests.Runs}</td>
                                <td>${response.data.data.batting.T20Is.Runs}</td>
                                <td>${response.data.data.batting.firstClass.Runs}</td>
                                <td>${response.data.data.batting.listA.Runs}</td>
                            </tr>
                            <tr>
                                <th>Highest</th>
                                <td>${response.data.data.batting.ODIs.HS}</td>
                                <td>${response.data.data.batting.tests.HS}</td>
                                <td>${response.data.data.batting.T20Is.HS}</td>
                                <td>${response.data.data.batting.firstClass.HS}</td>
                                <td>${response.data.data.batting.listA.HS}</td>
                            </tr>
                            <tr>
                                <th>Average</th>
                                <td>${response.data.data.batting.ODIs.Ave}</td>
                                <td>${response.data.data.batting.tests.Ave}</td>
                                <td>${response.data.data.batting.T20Is.Ave}</td>
                                <td>${response.data.data.batting.firstClass.Ave}</td>
                                <td>${response.data.data.batting.listA.Ave}</td>
                            </tr>
                            <tr>
                                <th>Ball Faced</th>
                                <td>${response.data.data.batting.ODIs.BF}</td>
                                <td>${response.data.data.batting.tests.BF}</td>
                                <td>${response.data.data.batting.T20Is.BF}</td>
                                <td>${response.data.data.batting.firstClass.BF}</td>
                                <td>${response.data.data.batting.listA.BF}</td>
                            </tr>
                            <tr>
                                <th>Strike Rate</th>
                                <td>${response.data.data.batting.ODIs.SR}</td>
                                <td>${response.data.data.batting.tests.SR}</td>
                                <td>${response.data.data.batting.T20Is.SR}</td>
                                <td>${response.data.data.batting.firstClass.SR}</td>
                                <td>${response.data.data.batting.listA.SR}</td>
                            </tr>
                            <tr>
                                <th>4s</th>
                                <td>${response.data.data.batting.ODIs["4s"]}</td>
                                <td>${response.data.data.batting.tests["4s"]}</td>
                                <td>${response.data.data.batting.T20Is["4s"]}</td>
                                <td>${response.data.data.batting.firstClass["4s"]}</td>
                                <td>${response.data.data.batting.listA["4s"]}</td>
                            </tr>
                            <tr>
                                <th>6s</th>
                                <td>${response.data.data.batting.ODIs.Six}</td>
                                <td>${response.data.data.batting.tests.Six}</td>
                                <td>${response.data.data.batting.T20Is.Six}</td>
                                <td>${response.data.data.batting.firstClass.Six}</td>
                                <td>${response.data.data.batting.listA.Six}</td>
                            </tr>
                            <tr>
                                <th>Catch</th>
                                <td>${response.data.data.batting.ODIs.Ct}</td>
                                <td>${response.data.data.batting.tests.Ct}</td>
                                <td>${response.data.data.batting.T20Is.Ct}</td>
                                <td>${response.data.data.batting.firstClass.Ct}</td>
                                <td>${response.data.data.batting.listA.Ct}</td>
                            </tr>
                            <tr>
                                <th>Stumping</th>
                                <td>${response.data.data.batting.ODIs.St}</td>
                                <td>${response.data.data.batting.tests.St}</td>
                                <td>${response.data.data.batting.T20Is.St}</td>
                                <td>${response.data.data.batting.firstClass.St}</td>
                                <td>${response.data.data.batting.listA.St}</td>
                            </tr>
                            <tr>
                                <th>Hundreds</th>
                                <td>${response.data.data.batting.ODIs.h}</td>
                                <td>${response.data.data.batting.tests.h}</td>
                                <td>${response.data.data.batting.T20Is.h}</td>
                                <td>${response.data.data.batting.firstClass.h}</td>
                                <td>${response.data.data.batting.listA.h}</td>
                            </tr>
                            <tr>
                                <th>Fifties</th>
                                <td>${response.data.data.batting.ODIs.m}</td>
                                <td>${response.data.data.batting.tests.m}</td>
                                <td>${response.data.data.batting.T20Is.m}</td>
                                <td>${response.data.data.batting.firstClass.m}</td>
                                <td>${response.data.data.batting.listA.m}</td>
                            </tr>
                        </table>
                    </div>      
                    <div>
                        <h4>Batting Records</h4>
                        <table class="table table-dark">
                            <tr>
                                <th></th>
                                <th>ODI</th>
                                <th>Test</th>
                                <th>T20</th>
                                <th>First Class</th>
                                <th>listA</th>
                            </tr>
                            <tr>
                                <th>Match</th>
                                <td>${response.data.data.bowling.ODIs.Mat}</td>
                                <td>${response.data.data.bowling.tests.Mat}</td>
                                <td>${response.data.data.bowling.T20Is.Mat}</td>
                                <td>${response.data.data.bowling.firstClass.Mat}</td>
                                <td>${response.data.data.bowling.listA.Mat}</td>
                            </tr>
                            <tr>
                                <th>Innings</th>
                                <td>${response.data.data.bowling.ODIs.Inns}</td>
                                <td>${response.data.data.bowling.tests.Inns}</td>
                                <td>${response.data.data.bowling.T20Is.Inns}</td>
                                <td>${response.data.data.bowling.firstClass.Inns}</td>
                                <td>${response.data.data.bowling.listA.Inns}</td>
                            </tr>
                            <tr>
                                <th>Balls</th>
                                <td>${response.data.data.bowling.ODIs.Balls}</td>
                                <td>${response.data.data.bowling.tests.Balls}</td>
                                <td>${response.data.data.bowling.T20Is.Balls}</td>
                                <td>${response.data.data.bowling.firstClass.Balls}</td>
                                <td>${response.data.data.bowling.listA.Balls}</td>
                            </tr>
                            <tr>
                                <th>Runs</th>
                                <td>${response.data.data.bowling.ODIs.Runs}</td>
                                <td>${response.data.data.bowling.tests.Runs}</td>
                                <td>${response.data.data.bowling.T20Is.Runs}</td>
                                <td>${response.data.data.bowling.firstClass.Runs}</td>
                                <td>${response.data.data.bowling.listA.Runs}</td>
                            </tr>
                            <tr>
                                <th>Wickets</th>
                                <td>${response.data.data.bowling.ODIs.Wkts}</td>
                                <td>${response.data.data.bowling.tests.Wkts}</td>
                                <td>${response.data.data.bowling.T20Is.Wkts}</td>
                                <td>${response.data.data.bowling.firstClass.Wkts}</td>
                                <td>${response.data.data.bowling.listA.Wkts}</td>
                            </tr>
                            <tr>
                                <th>Best Bowling(Innings)</th>
                                <td>${response.data.data.bowling.ODIs.BBI}</td>
                                <td>${response.data.data.bowling.tests.BBI}</td>
                                <td>${response.data.data.bowling.T20Is.BBI}</td>
                                <td>${response.data.data.bowling.firstClass.BBI}</td>
                                <td>${response.data.data.bowling.listA.BBI}</td>
                            </tr>
                            <tr>
                                <th>Best Bowling(Match)</th>
                                <td>${response.data.data.bowling.ODIs.BBM}</td>
                                <td>${response.data.data.bowling.tests.BBM}</td>
                                <td>${response.data.data.bowling.T20Is.BBM}</td>
                                <td>${response.data.data.bowling.firstClass.BBM}</td>
                                <td>${response.data.data.bowling.listA.BBM}</td>
                            </tr>
                            <tr>
                                <th>Average</th>
                                <td>${response.data.data.bowling.ODIs.Ave}</td>
                                <td>${response.data.data.bowling.tests.Ave}</td>
                                <td>${response.data.data.bowling.T20Is.Ave}</td>
                                <td>${response.data.data.bowling.firstClass.Ave}</td>
                                <td>${response.data.data.bowling.listA.Ave}</td>
                            </tr>
                            <tr>
                                <th>Economy</th>
                                <td>${response.data.data.bowling.ODIs.Econ}</td>
                                <td>${response.data.data.bowling.tests.Econ}</td>
                                <td>${response.data.data.bowling.T20Is.Econ}</td>
                                <td>${response.data.data.bowling.firstClass.Econ}</td>
                                <td>${response.data.data.bowling.listA.Econ}</td>
                            </tr>
                            <tr>
                                <th>Strike Rate</th>
                                <td>${response.data.data.bowling.ODIs.SR}</td>
                                <td>${response.data.data.bowling.tests.SR}</td>
                                <td>${response.data.data.bowling.T20Is.SR}</td>
                                <td>${response.data.data.bowling.firstClass.SR}</td>
                                <td>${response.data.data.bowling.listA.SR}</td>
                            </tr>
                            <tr>
                                <th>4 Wicket hall</th>
                                <td>${response.data.data.bowling.ODIs["4s"]}</td>
                                <td>${response.data.data.bowling.tests["4s"]}</td>
                                <td>${response.data.data.bowling.T20Is["4s"]}</td>
                                <td>${response.data.data.bowling.firstClass["4s"]}</td>
                                <td>${response.data.data.bowling.listA["4s"]}</td>
                            </tr>
                            <tr>
                                <th>5 Wicket hall</th>
                                <td>${response.data.data.bowling.ODIs.F}</td>
                                <td>${response.data.data.bowling.tests.F}</td>
                                <td>${response.data.data.bowling.T20Is.F}</td>
                                <td>${response.data.data.bowling.firstClass.F}</td>
                                <td>${response.data.data.bowling.listA.F}</td>
                            </tr>
                            <tr>
                                <th>10  Wicket hall</th>
                                <td>${response.data.data.bowling.ODIs.ten}</td>
                                <td>${response.data.data.bowling.tests.ten}</td>
                                <td>${response.data.data.bowling.T20Is.ten}</td>
                                <td>${response.data.data.bowling.firstClass.ten}</td>
                                <td>${response.data.data.bowling.listA.ten}</td>
                            </tr>
                        </table>
                    </div>  
                    <a href="index.html" id="goBackBtn" class="btn btn-primary">Go back to Search</a>       
                </div> 
                `
            $('#player').html(output)
        })
        .catch(function (err) {
            console.log(err)
        })

}