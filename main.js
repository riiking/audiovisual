var fs = require('fs');
var _ = require('lodash');
var result = 0;
var map;
var counter = 0;
var goldList = ['shiny gold'];
fs.readFile('input', 'utf8', function(err, data) {
  if (err) throw err;
  const values = data.split("\r\n");


  values.pop();
  map = mapBags(values);
  // for (let entrie in map) {
  //   if(digDeep(map)){
  //     result++;
  //   }
  // }
  part1(7, parse_data(values));


});

function mapBags(bags) {
  let map = {};
  let matches;
  const regexKey = RegExp('[a-z]+', 'g');
  bags.forEach((e) => {
    matches = e.matchAll(regexKey);
    matches = Array.from(matches, m => m[0]);

    _.remove(matches, function(n) {
      return (n == 'bags' || n == 'bag' || n == 'contain' || n == 'no' || n == 'other');
    });
    matches = _.chunk(matches, 2);


    matches.forEach((e, i) => {
      matches[i] = uniteArray(e);
    });

    //map[matches[0]] = allButFirst(matches);

  });

  return matches;

}

function parse_data( lines ) {
  let parsed = {};

  for( let line of lines ) {
    let [ bag, contains_str ] =  line.split( " bags contain " );

    // console.log( `bag: ${bag}, contains: ${contains_str}` );

    let contains = [];

    if( !contains_str.startsWith( "no other " ) ) {
      let contained_bags = contains_str.split( ", " );

      // console.log( contained_bags )

      for( let contained_bag of contained_bags ) {
        let [ ignore, count, bag ] = contained_bag.match( /^(\d*)\s(.*)\sbag/ );

        // console.log( `contained bag: ${bag}, count: ${count}` );

        contains.push( [ bag, Number( count ) ] );
      }
    }

    parsed[ bag ] = contains;
  }

  // console.log( parsed );

  return( parsed );
}

function digDeep(array) {
  counter++;

  if (_.some(array, e => goldList.includes(e))) {
    goldList.push(array[0]);
    return true;
  } else {
    for (let i = 1; i < array.length-1; i++) {

      if (digDeep(array)) {
        return true;
      }
    }
    return false;
  }
}



function uniteArray(array) {
  return array[0] + " " + array[1];
}

function allButFirst(array) {
  array.shift();
  return array;
}

function bagContains( input, inner_bags, find_bag ) {
  if( inner_bags.find( inner_bag => inner_bag[0] == find_bag ) ) {
    return( true );
  }

  for( let inner_bag of inner_bags ) {
    if( bagContains( input, input[ inner_bag[0] ], find_bag ) ) {
      return( true )
    }
  }

  return( false );
}


function getNumberOfContainedBags( input, outer_bag, outer_count ) {
  let contained_count = 0;

  // console.log( `counting contains for ${outer_bag}` );

  let contained_bags = input[ outer_bag ];

  // console.log( `   containded: ${contained_bags }` )

  for( let contained_bag of contained_bags ) {
    contained_count += outer_count * contained_bag[ 1 ];

    contained_count += outer_count * getNumberOfContainedBags( input, contained_bag[ 0 ], contained_bag[1] );
  }

  return( contained_count );
}


/************************************************************************************
 *
 * Part 1 Function
 *
 ************************************************************************************/

function part1( day, input ) {
  let sum = 0;

  let find_bag = "shiny gold";

  for( let outer_bag of Object.keys( input ) ) {
    if(  bagContains( input, input[ outer_bag ], find_bag ) ) {
      sum++;
    }
  }

  console.log( `Day ${day} answer, part 1: ${sum}` );
 }
