/**a
 * 69. x的平方根
 */
function mySqrt(x: number): number {
	if (x == 1) {
		return 1;
	}
	let min = 0;
	let max = x;
	while ((max - min) > 1) {
		let m = (max + min) >> 1;
		if ((x / m) < m) {
			max = m;
		} else {
			min = m;
		}
	}
	return min;
}
// function mySqrt(c: number): number {
//     let err = 1e-9;
//         let x0 = 0;
//         let x1 = c;
//         while(true){
//             x0 = 0.5*x1+0.5*c/x1;
//             if(Math.abs(x1 - x0) < err){
//                 break;
//             }
//             x1 = x0;
//         }
//         return x1;
// };
