var page = new WebPage(), testindex = 0, loadInProgress = false;

page.onConsoleMessage = function(msg){
  console.log(msg);

};


page.onLoadStarted = function(){
  loadInProgress = true;
  console.log('load started');
};

page.onLoadFinished = function(){
  loadInProgress = false;
  console.log('load finished');
};


var steps = [
  function(){
    console.log('open page');
    page.open("http://scheduleplanner.rice.edu/wsSchedule/Account/CourseSelection.aspx");
  },


  function(){
    console.log("login information");
    page.injectJs("jquery-1.10.2.min.js");
    page.evaluate(function(){
      $("#username").val("hl33");
      $("#password").val("hongyu1013");
      console.log(document.title);
     
    });
  
  },

  function(){
    console.log("submit form");
    page.evaluate(function(){
      // var arr = document.getElementById('fm1');
      // var i;

      // for(i = 0; i < arr.length; i++){
      //   if(arr[i].getAttribute('method') == 'POST'){
      //     arr[i].submit();
      //     return;
      //   }
      // }

      // document.forms[0].submit();
      
      $("input[name= 'submit']").click();
      return;
    });
  },

  function(){
    page.evaluate(function(){
     // console.log(document.querySelectorAll('html')[0].outerHTML);

     var courseList = document.body.querySelectorAll('table#ctl00_MainContent_gvCourses > tbody > tr');
     var i;
     var tag;
     console.log('course list');
     for(i=0;i<courseList.length;i++){
        var x = courseList[i].getElementsByTagName('td');
        // for(tag=0;tag<x.length;tag++){
            console.log(x[1].innerHTML);
             
        // }

     }


    });
  }

//     function(){
//     console.log('open page');
//     page.open("http://scheduleplanner.rice.edu/wsSchedule/Account/CourseSelection.aspx");
//      console.log(document.querySelectorAll('html')[0].outerHTML);
    
//   }
];
  

interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex] == "function") {
    console.log("step " + (testindex + 1));
    steps[testindex]();
    testindex++;
  }
  if (typeof steps[testindex] != "function") {
    console.log("test complete!");
    phantom.exit();
  }
}, 50);






