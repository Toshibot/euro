function roundCalc(d) {
   var currentDate = new Date(d);
   var month = currentDate.getMonth();
   var date = currentDate.getDate();
   var year = currentDate.getFullYear();

   // Gameday 1
   if (year == "2018" && month <= 7 && date <= 27) {
       return 1;

   // Gameday 2    
   } else if (year == "2018" && month == 7 && date <= 31 || year == "2018" && month == 8 && date == 2){
       return 2;

   // Gameday 3    
   } else if (year == "2018" && month == 8 && date <= 16){
      return 3;

   // Gameday 4    
   } else if (year == "2018" && month == 8 && date <= 23){
      return 4;

   // Gameday 5    
   } else if (year == "2018" && month == 8 && date <= 26){
      return 5;

   // Gameday 6    
   } else if (year == "2018" && month == 8 && date <= 30){
      return 6;

   // Gameday 7    
   } else if (year == "2018" && month == 9 && date <= 7){
      return 7;

   // Gameday 8    
   } else if (year == "2018" && month == 9 && date <= 21){
      return 8;

   // Gameday 9    
   } else if (year == "2018" && month == 9 && date <= 28){
      return 9;

   // Gameday 10    
   } else if (year == "2018" && month == 9 && date <= 31 || year == "2018" && month == 10 && date <= 4){
      return 10;

   // Gameday 11    
   } else if (year == "2018" && month == 10 && date <= 11){
      return 11;

   // Gameday 12    
   } else if (year == "2018" && month == 10 && date <= 25){
      return 12;

   // Gameday 13    
   } else if (year == "2018" && month == 10 && date <= 31 || year == "2018" && month == 11 && date <= 3){
      return 13;

   // Gameday 14    
   } else if (year == "2018" && month == 11 && date <= 9){
      return 14;

   // Gameday 15    
   } else if (year == "2018" && month == 11 && date <= 16){
      return 15;

   // Gameday 16    
   } else if (year == "2018" && month == 11 && date <= 19){
      return 16;

   // Gameday 17    
   } else if (year == "2018" && month == 11 && date <= 23){
      return 17;

   // Gameday 18    
   } else if (year == "2019" && month == 0 && date <= 20){
      return 18;

   // Gameday 19
   } else if (year == "2019" && month == 0 && date <= 27){
      return 19;

   // Gameday 20
   } else if (year == "2019" && month == 0 && date <= 31 || year == "2019" && month == 1 && date <= 3){
      return 20;

   // Gameday 21
   } else if (year == "2019" && month == 1 && date <= 10){
      return 21;

   // Gameday 22
   } else if (year == "2019" && month == 1 && date <= 18){
      return 22;

   // Gameday 23
   } else if (year == "2019" && month == 1 && date <= 25){
      return 23;

   // Gameday 24
   } else if (year == "2019" && month == 1 && date <= 25){
      return 24;

   // Gameday 25
   } else if (year == "2019" && month == 1 && date <= 31 || year == "2019" && month == 2 <= 3){
      return 25;

   // Gameday 26
   } else if (year == "2019" && month == 2 && date <= 11){
      return 26;

   }
}