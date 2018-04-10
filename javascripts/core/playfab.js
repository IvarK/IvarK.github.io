function playFabLogin(){
  
  
      try {
          var authTicket = kongregate.services.getGameAuthToken();
          var requestData = {
              TitleId: "5695",
              KongregateId: kongregate.services.getUserId(),
              AuthTicket: authTicket,
              CreateAccount: true
          }
          try {
              PlayFab.ClientApi.LoginWithKongregate(requestData, playFabLoginCallback);
          }
          catch (e){
              console.log("Unable to send login request to PlayFab.");
          }
      } catch (e) {console.log(e)}
  }
  
  var playFabId = -1
  function playFabLoginCallback(data, error){
      if (error){
          console.log(error.errorMessage);
          $.notify("Couldn't log in to PlayFab Cloud. You need to be logged in to Kongregate.", "error")
          document.getElementById("cloudOptions").style.display = "none"
          document.getElementById("cloud").style.display = "none"
          return;
      }
      if (data){
          //NOTE: SAVE 'playFabId' to a global variable somewhere, I just declare mine at the start of the playfab stuff. Use this variable to tell if your player is logged in to playfab or not.
          playFabId = data.data.PlayFabId;
          $.notify("Logged in to PlayFab Cloud", "info")
  
          if (player.options.cloud) playFabLoadCheck()
          console.log("Logged in to playFab")
      }
  }
  
  
  function playFabSaveCheck(){
    if (playFabId == -1) return false;
    if (typeof PlayFab === 'undefined' || typeof PlayFab.ClientApi === 'undefined'){
      //Should never get this far without the api
      console.log(error);
      return;
    }
    var requestData = {
      Keys: ["infinitied", "eternities"],
      PlayFabId: playFabId
    }
    try {
      PlayFab.ClientApi.GetUserData(requestData, playFabSaveCheckCallback);
    }
    catch (e){console.log(e);}
  }
  
  function playFabSaveCheckCallback(data, error){
    if (error){
      console.log("error checking existing PlayFab data");
          console.log(error);
          playFabLogin()
      return;
    }
    if (data){
          var playFabInfinitied = (data.data.Data.infinitied) ? parseInt(data.data.Data.infinitied.Value) : 0;
          var playFabEternities = (data.data.Data.eternities) ? parseInt(data.data.Data.eternities.Value) : 0;
          if (playFabEternities > player.eternities){
              document.getElementById("saveCloud").style.display = "block";
              document.getElementById("savePopup").innerHTML = "You have a cloud save with "+playFabInfinitied+ " Infinities and "+playFabEternities+" Eternities your local save has "+player.infinitied+" Infinities and "+player.eternities+" Eternities. Do you want to overwrite the cloud save?"
        return;
          }
      else if (playFabEternities == player.eternities && playFabInfinitied > player.infinitied){
              document.getElementById("saveCloud").style.display = "block";
              document.getElementById("savePopup").innerHTML = "You have a cloud save with "+playFabInfinitied+ " Infinities and "+playFabEternities+" Eternities your local save has "+player.infinitied+" Infinities and "+player.eternities+" Eternities. Do you want to overwrite the cloud save?"
        return;
      }
      else saveToPlayFab();
    }
  }
  
  function saveToPlayFab(){
      if (!playFabId || typeof PlayFab === 'undefined' || typeof PlayFab.ClientApi === 'undefined') return false;
      var requestData = {
          TitleId: "5695",
          PlayFabId: playFabId,
          Data: {
              save: LZString.compressToEncodedURIComponent(JSON.stringify(player)),
              infinitied: player.infinitied,
              eternities: player.eternities
          }
      }
      try{
          PlayFab.ClientApi.UpdateUserData(requestData, saveToPlayFabCallback);
      }
      catch(e){console.log(e);}
  }
  
  function saveToPlayFabCallback(data, error){
      if (error){
          console.log(error);
          return false;
  
      }
      if (data){
          console.log("Game Saved!");
          $.notify("Game saved to cloud", "info")
          save_game()
          return true;
      }
  }
  
  function loadFromPlayFab(){
      if (!playFabId || typeof PlayFab === 'undefined' || typeof PlayFab.ClientApi === 'undefined'){
          console.log(playFabId, PlayFab);
           return false;
      }
      var requestData = {
          Keys: ["save"],
          PlayFabId: playFabId
      }
      try{
          console.log('attempting to send load request');
          PlayFab.ClientApi.GetUserData(requestData, loadFromPlayFabCallback);
          console.log('sent load request');
      }
      catch(e){console.log(e);}
  }
  
  function loadFromPlayFabCallback(data, error){
      console.log('loading callback fired');
      console.log(data, error);
      if (error){
          console.log(error);
          return;
      }
      if (data){
          console.log(data)
          $.notify("Loaded from cloud", "info")
          var id = playFabId;
          loadFromString(data.data.Data.save.Value);
      }
  }
  
  
  function playFabLoadCheck() {
      if (!playFabId || typeof PlayFab === 'undefined' || typeof PlayFab.ClientApi === 'undefined'){
          console.log(playFabId, PlayFab);
           return false;
      }
      var requestData = {
          Keys: ["infinitied", "eternities"],
          PlayFabId: playFabId
      }
      try{
          console.log('attempting to send load request');
          PlayFab.ClientApi.GetUserData(requestData, playFabLoadCheckCallback);
          console.log('sent load request');
      }
      catch(e){console.log(e);}
  }
  
  function playFabLoadCheckCallback(data, error) {
      if (error){
      console.log("error checking existing PlayFab data");
      console.log(error);
      return;
    }
    if (data){
          var playFabInfinitied = (data.data.Data.infinitied) ? parseInt(data.data.Data.infinitied.Value) : 0;
          var playFabEternities = (data.data.Data.eternities) ? parseInt(data.data.Data.eternities.Value) : 0;
      if (playFabInfinitied <= player.infinitied && playFabEternities <= player.eternities){
              document.getElementById("loadCloud").style.display = "block";
              document.getElementById("loadPopup").innerHTML = "You have a cloud save with "+playFabInfinitied+ " Infinities and "+playFabEternities+" Eternities your local save has "+player.infinitied+" Infinities and "+player.eternities+" Eternities. Do you want to load the cloud save?"
        return;
      }
      else loadFromPlayFab();
    }
  }
  
  function toggleCloud() {
      if (player.options.cloud) {
          player.options.cloud = false
          document.getElementById("cloud").innerHTML = "Automatic cloud saving/loading OFF"
      } else {
          player.options.cloud = true
          document.getElementById("cloud").innerHTML = "Automatic cloud saving/loading ON"
      }
  }