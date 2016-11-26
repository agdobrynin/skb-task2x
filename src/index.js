let express = require('express');
let cors = require('cors');
let math = require('mathjs');
let BigNumber = require('big-number');

const app = express();
app.use(cors());

/*
http://www.math.rwth-aachen.de/~Martin.Schoenert/Cube-Lovers/Dan_Hoey__Re__lower_bounds.html
PH[0]  = 1
PH[1] <= 6*3*PH[0]
PH[2] <= 6*2*PH[1]   + 9*3*PH[0]
PH[n] <= 6*2*PH[n-1] + 9*2*PH[n-2] for n > 2.
*/

function calc_number( i = 0 ){
  if( i == 0 ) return 1;
  if( i == 1 ) return 6 * 3 * calc_number(0); //18
  if( i == 2 ) return 6 * 2 * calc_number(1) + 9 * 3 * calc_number(0);
  //return 6 * 2 * calc_number( i - 1 ) + 9 * 2 * calc_number( i - 2 );
  return BigNumber(12).multiply(calc_number( i - 1 ) ).plus( BigNumber(18).multiply(calc_number( i - 2 )) );
  //BigNumber(5).plus(97).minus(53).plus(434).multiply(5435423).add(321453).multiply(21).div(2).pow(2);
}

// index page
app.get('/', (req, res) => {
  res.send( calc_number( req.query.i ).toString() );
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000 ...');
  
});
