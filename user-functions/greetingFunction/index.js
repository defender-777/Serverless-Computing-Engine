const event = JSON.parse(process.argv[2]);

exports.handler = async (event) => {

  const prices = event.prices;

  const sum = prices.reduce((a, b) => a + b, 0);
  const average = sum / prices.length;

  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);

  // Calculate daily returns
  const returns = [];

  for (let i = 1; i < prices.length; i++) {
    const r = (prices[i] - prices[i-1]) / prices[i-1];
    returns.push(r);
  }

  // Volatility calculation
  const meanReturn = returns.reduce((a,b)=>a+b,0)/returns.length;

  const variance = returns.reduce((sum,r)=>{
    return sum + Math.pow(r - meanReturn,2);
  },0)/returns.length;

  const volatility = Math.sqrt(variance);

  return {
    averagePrice: average,
    maxPrice,
    minPrice,
    volatility
  };

};

(async () => {

  const result = await exports.handler(event);

  console.log(JSON.stringify(result));

})();