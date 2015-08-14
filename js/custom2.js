$(function(){
  var className = 'ex';
  $('.box').click(function(){
    if(!$(this).hasClass('ex') && !$(this).hasClass('oh')){
      $(this).addClass(className);
      className = (className === 'ex' ? 'oh' : 'ex');
    }
  });


  $('.myButton').click(function(){
    $('.box').attr('class','box');
  })
});
