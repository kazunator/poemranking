const startPoemDiv = document.querySelector("#start-poem");
const continuationsList = document.getElementById("continuations");
const getNewPoemButton = document.querySelector("#get-new-poem-button");
const submitRankingButton = document.querySelector("#submit-ranking-button");
const baseUrl = "https://thesis-server.onrender.com";

getNewPoemButton.addEventListener("click", event => {
  fetch(`${baseUrl}/get-poem`).then(response => response.json())
  .then(poem => {
    const start = document.querySelector("#start-poem");
    const continuations = document.querySelector("#continuations");
    const submitRankingButton = document.querySelector("#submit-ranking-button");
      start.innerHTML = poem.start;
      console.log(poem);
      continuations.innerHTML = "";
      for (const continuation of poem.continuations) {
        continuations.innerHTML += `
        <div style="display: block; padding: 10px;">
        <p style="white-space: pre-wrap; display: block" class="p1">${continuation}</p>
        <form style="display: block" class="form1">
        <label for="ranking-input">Rank this suggestion</label>
        <select id="ranking-input" name="ranking-input">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        </form>
        </div>
        `;
        
      }
      getNewPoemButton.disabled = true;
      submitRankingButton.disabled = false;
    })
    .catch(error => {
      console.error(error);
    });
});




submitRankingButton.addEventListener('click', async function() {
  // Collect the rankings that the user has selected
  let rankings = [];
    const forms = document.getElementsByTagName("form");
    const startOfPoem = document.querySelector("#start-poem");
    for (let i = 0; i < forms.length; i++) {
      rankings = [];
      const ranking = forms[i].querySelector("#ranking-input").value;
      const continuation = forms[i].parentNode.querySelector("p").innerText;
      const start =  startOfPoem.textContent;
      console.log(ranking, continuation);
      rankings.push({start , continuation, ranking });
      try {
        console.log(JSON.stringify( {start: start, continuation: continuation, ranking: ranking} ));
        const response =  await fetch("https://thesis-server.onrender.com/submit-ranking", {
          method: "POST",
          body: JSON.stringify( {start: start, continuation: continuation, ranking: ranking}),
          headers: {
            "Content-Type": "application/json"
          }
        });      
      } catch (error) {
        console.log(error);
      }  
    }
    getNewPoemButton.disabled = false;
  
    submitRankingButton.disabled = true;
  
});
