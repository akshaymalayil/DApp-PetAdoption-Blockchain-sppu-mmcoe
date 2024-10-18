App = {
  web3Provider: null,
  contracts: {},


  init: async function() {
      await App.initWeb3();
      await App.initContracts(); // Initialize both contracts
      await App.loadPets();
      App.bindEvents();
  },


  initWeb3: async function() {
      if (window.ethereum) {
          App.web3Provider = window.ethereum;
          try {
              await window.ethereum.request({ method: 'eth_requestAccounts' });
          } catch (error) {
              console.log("User denied account access");
          }
      } else if (window.web3) {
          App.web3Provider = window.web3.currentProvider;
      } else {
          App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      }
      web3 = new Web3(App.web3Provider);
  },


  initContracts: async function() {
      // Initialize Adoption contract
      const adoptionData = await $.getJSON('Adoption.json');
      App.contracts.Adoption = TruffleContract(adoptionData);
      App.contracts.Adoption.setProvider(App.web3Provider);


      // Initialize UserRegistration contract
      const userRegistrationData = await $.getJSON('UserRegistration.json');
      App.contracts.UserRegistration = TruffleContract(userRegistrationData);
      App.contracts.UserRegistration.setProvider(App.web3Provider);
  },


  bindEvents: function() {
      $(document).on('click', '.btn-adopt', App.handleAdopt);
  },


  registerUser: function() {
      let email = document.getElementById('email').value;


      web3.eth.getAccounts(async function(error, accounts) {
          if (error) {
              console.log(error);
              return;
          }


          let account = accounts[0];
          const instance = await App.contracts.UserRegistration.deployed();


          try {
              await instance.registerUser(email, { from: account });
              // alert("Registration successful!");
          } catch (err) {
              console.error(err.message);
          }
      });
  },


  signInUser: function() {
      let email = document.getElementById('email').value;


      web3.eth.getAccounts(async function(error, accounts) {
          if (error) {
              console.log(error);
              return;
          }


          let account = accounts[0];
          const instance = await App.contracts.UserRegistration.deployed();


          try {
              const storedEmail = await instance.getEmail.call({ from: account });


              if (storedEmail === email) {
                  // alert("Sign-in successful!");
                  window.location.href = "main.html"; // Redirect to main.html on sign-in
              } else {
                  alert("User not registered. Please register first.");
              }
          } catch (err) {
              console.error(err.message);
          }
      });
  },


  handleAdopt: function(event) {
      event.preventDefault();


      var petId = parseInt($(event.target).data('id'));
      var adoptionInstance;


      web3.eth.getAccounts(function(error, accounts) {
          if (error) {
              console.log(error);
          }


          var account = accounts[0];


          App.contracts.Adoption.deployed().then(function(instance) {
              adoptionInstance = instance;
              return adoptionInstance.adopt(petId, { from: account });
          }).then(function(result) {
              console.log('Adoption successful:', result);
              return App.markAdopted();
          }).catch(function(err) {
              console.log('Adoption error:', err.message);
          });
      });
  },
  



  markAdopted: function() {
      var adoptionInstance;


      App.contracts.Adoption.deployed().then(function(instance) {
          adoptionInstance = instance;
          return adoptionInstance.getAdopters.call();
      }).then(function(adopters) {
          for (let i = 0; i < adopters.length; i++) {
              if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
                  $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
              }
          }
      }).catch(function(err) {
          console.log(err.message);
      });
  },


  loadPets: function() {
      $.getJSON('pets.json', function(data) {
          var petsRow = $('#petsRow');
          var petTemplate = $('#petTemplate');


          for (let i = 0; i < data.length; i++) {
              petTemplate.find('.panel-title').text(data[i].name);
              petTemplate.find('img').attr('src', data[i].picture);
              petTemplate.find('.pet-breed').text(data[i].breed);
              petTemplate.find('.pet-age').text(data[i].age);
              petTemplate.find('.pet-location').text(data[i].location);
              petTemplate.find('.btn-adopt').attr('data-id', data[i].id);


              petsRow.append(petTemplate.html());
          }
      });
  },
};


// Initialize on page load
$(window).load(function() {
  App.init();
});
