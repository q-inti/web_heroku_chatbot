/**
* Template Name: Mamba - v2.1.0
* Template URL: https://bootstrapmade.com/mamba-one-page-bootstrap-template-free/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

!(function($) {
  "use strict";
  
  // Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: "AIzaSyDAy_au2fnfVQMJm4tHm74UdDLmU1br5BE",
    authDomain: "testy-50787.firebaseapp.com",
    databaseURL: "https://testy-50787.firebaseio.com/",
    storageBucket: "gs://testy-50787.appspot.com"
  };
  firebase.initializeApp(config);


  // Get a reference to the database service
  const dbRef = firebase.database().ref();
  const usersRef = dbRef.child('usuarios');

  readUserData(); 
  // --------------------------
  // READ
  // --------------------------
  function readUserData() {

    const userListUI = document.getElementById("user-list");

    usersRef.on("value", snap => {

      userListUI.innerHTML = ""

      snap.forEach(childSnap => {

        let key = childSnap.key,
          value = childSnap.val()
          
        let $li = document.createElement("li");

        // edit icon
        let editIconUI = document.createElement("span");
        editIconUI.class = "edit-user";
        editIconUI.innerHTML = " ✎";
        editIconUI.setAttribute("userid", key);
        editIconUI.addEventListener("click", editButtonClicked)

        // delete icon
        let deleteIconUI = document.createElement("span");
        deleteIconUI.class = "delete-user";
        deleteIconUI.innerHTML = " ☓";
        deleteIconUI.setAttribute("userid", key);
        deleteIconUI.addEventListener("click", deleteButtonClicked)
        
        $li.innerHTML = value.name;
        $li.append(editIconUI);
        $li.append(deleteIconUI);

        $li.setAttribute("user-key", key);
        $li.addEventListener("click", userClicked)
        userListUI.append($li);

      });


    })

  }



  function userClicked(e) {


      var userID = e.target.getAttribute("user-key");

      const userRef = dbRef.child('usuarios/' + userID);
      const userDetailUI = document.getElementById("user-detail");

      userRef.on("value", snap => {

        userDetailUI.innerHTML = ""

        snap.forEach(childSnap => {
          var $p = document.createElement("p");
          $p.innerHTML = childSnap.key  + " - " +  childSnap.val();
          userDetailUI.append($p);
        })

      });
    

  }





  // --------------------------
  // ADD
  // --------------------------

  const addUserBtnUI = document.getElementById("add-user-btn");
  addUserBtnUI.addEventListener("click", addUserBtnClicked)



  function addUserBtnClicked() {

    const usersRef = dbRef.child('usuarios');

    const addUserInputsUI = document.getElementsByClassName("user-input");

    // this object will hold the new user information
      let newUser = {};

      // loop through View to get the data for the model 
      for (let i = 0, len = addUserInputsUI.length; i < len; i++) {

          let key = addUserInputsUI[i].getAttribute('data-key');
          let value = addUserInputsUI[i].value;
          newUser[key] = value;
      }

    usersRef.push(newUser)

      
    console.log(myPro)
    


  }


  // --------------------------
  // DELETE
  // --------------------------
  function deleteButtonClicked(e) {

      e.stopPropagation();

      var userID = e.target.getAttribute("userid");

      const userRef = dbRef.child('usuarios/' + userID);
      
      userRef.remove();

  }


  // --------------------------
  // EDIT
  // --------------------------
  function editButtonClicked(e) {
    
    document.getElementById('edit-user-module').style.display = "block";

    //set user id to the hidden input field
    document.querySelector(".edit-userid").value = e.target.getAttribute("userid");

    const userRef = dbRef.child('usuarios/' + e.target.getAttribute("userid"));

    // set data to the user field
    const editUserInputsUI = document.querySelectorAll(".edit-user-input");


    userRef.on("value", snap => {

      for(var i = 0, len = editUserInputsUI.length; i < len; i++) {

        var key = editUserInputsUI[i].getAttribute("data-key");
            editUserInputsUI[i].value = snap.val()[key];
      }

    });




    const saveBtn = document.querySelector("#edit-user-btn");
    saveBtn.addEventListener("click", saveUserBtnClicked)
  }


  function saveUserBtnClicked(e) {
  
    const userID = document.querySelector(".edit-userid").value;
    const userRef = dbRef.child('usuarios/' + userID);

    var editedUserObject = {}

    const editUserInputsUI = document.querySelectorAll(".edit-user-input");

    editUserInputsUI.forEach(function(textField) {
      let key = textField.getAttribute("data-key");
      let value = textField.value;
        editedUserObject[textField.getAttribute("data-key")] = textField.value
    });



    userRef.update(editedUserObject);

    document.getElementById('edit-user-module').style.display = "none";


  }

// ==========//


  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Stick the header at top on scroll
  $("#header").sticky({
    topSpacing: 0,
    zIndex: '50'
  });

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top;
        var scrolled = 2;

        if ($('#header-sticky-wrapper').length) {
          scrollto -= $('#header-sticky-wrapper').outerHeight() - scrolled;
        }

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');
  var main_nav_height = $('#header').outerHeight();

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 10;

    nav_sections.each(function() {
      var top = $(this).offset().top - main_nav_height,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
    });
  });

  // Intro carousel
  var heroCarousel = $("#heroCarousel");
  var heroCarouselIndicators = $("#hero-carousel-indicators");
  heroCarousel.find(".carousel-inner").children(".carousel-item").each(function(index) {
    (index === 0) ?
    heroCarouselIndicators.append("<li data-target='#heroCarousel' data-slide-to='" + index + "' class='active'></li>"):
      heroCarouselIndicators.append("<li data-target='#heroCarousel' data-slide-to='" + index + "'></li>");
  });

  heroCarousel.on('slid.bs.carousel', function(e) {
    $(this).find('h2').addClass('animated fadeInDown');
    $(this).find('p').addClass('animated fadeInUp');
    $(this).find('.btn-get-started').addClass('animated fadeInUp');
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the venobox plugin
  $(window).on('load', function() {
    $('.venobox').venobox();
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // Initi AOS
  AOS.init({
    duration: 1000,
    easing: "ease-in-out-back"
  });

  

})(jQuery);