import {getUserSessionData} from "../utils/session"
import {API_URL} from "../utils/server"

let page = document.querySelector("#page");

const RankScorePage = () => {
    loadAllscore();
}

const loadAllscore = async() => {
    let user = getUserSessionData();
    await fetch(API_URL + 'users/maxscoreBoard', { headers: { "Authorization": user.token} }).then(function(response){
        if(!response.ok){
            throw new Error(response.status + " " + response.statusText);
        }
        return response.json();
    }).then(function(reponse){
        let index = 1;
        let content = "";
        reponse.mamaxscoreBoard.every(function(element){   
            content += `
                <tr>
                    <td class="w-25 text-warning">` + index++ +`</td>
                    <td class="w-50 text-warning">`+ element.username +`</td>
                    <td class="w-25 text-warning">` + element.totalHighscore + `</td>
                </tr>`;
            return true;                   
        }).catch((err) => onError(err));
    

    let pageHtml = `
        <div class="row mx-0">
            <div class="col-0 col-md-2 col-lg-3"></div>
            <div class="mt-3 mt-sm-5 col-12 col-md-8 col-lg-6">
                <h1 class="text-center mb-3">Classements</h1>
                <table class="table table-dark text-center">
                    <thead>
                        <tr><th colspan="3"><h5>Meilleurs Scores Généraux</h5></th></tr>
                    </thead>
                    <tbody>`
                        + content +
                    `</tbody>
                </table>
            </div>
    </div>`;
        page.innerHTML = pageHtml;
    });

    function onError(err) {
        let page = document.querySelector(".page");
        let errorMessage = "";
        if (err.message.includes("409"))
          errorMessage = "ERROR";
        else errorMessage = err.message;
        page.innerText = errorMessage;
      };

}

export default RankScorePage;