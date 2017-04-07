/**
 * Created by DIMITRIOS on 10/8/2016.
 */

class pcnnls {

    constructor(){
        this.maxiter = 10;
        this.eps = 2.2204460492503130808472633361816E-16;

        this.x = [];
        this.y = [];
    }

    run(A,b,x0){
        //console.log('A');
        //ppr(A);
        //console.log('b');
        //ppr(b);
        //console.log('x0');
        //ppr(x0);

        var dims = numeric.dim(A);
        this.m = dims[0];
        this.n = dims[1];

        this.tol1 = this.n*this.eps;
        this.tol2 = this.n*Math.sqrt(this.eps);

        var AtA = numeric.dot(numeric.transpose(A), A);
        var Atb = numeric.dot(numeric.transpose(A), b);
        var In = numeric.identity(this.n);

        var e = new Array(this.n).fill(1);

        var y0 = x0.slice();
        var k = 0;

        var xk = x0;
        var yk = y0;

        var noready = true;

        while(noready){
            k++;

            // Step 1
            var Xk = numeric.diag(xk);
            var Yk = numeric.diag(yk);
            var C = (concatLines(Xk,Yk)).concat(concatLines(AtA, nn(In)));




            var d_FirstPart = nn(nd(nd(Xk,Yk),e));
            var d_SecondPart = na(na(nn(nd(nd(AtA,Xk),e)),nd(Yk,e)),Atb);
            var d = d_FirstPart.concat(d_SecondPart);

            var uv = nd(numeric.inv(C), d);
            var uk = uv.slice(0, this.n);
            var vk = uv.slice(this.n, 2*this.n);

            // Step 2
            var neg_uk = findNeg(uk);
            var T1_first_part = numeric.neg( selArr(xk, neg_uk ));
            var T1_second_part =  selArr(uk, neg_uk);
            var T1 = arrayMin( numeric.div( T1_first_part, T1_second_part) );

            var neg_vk = findNeg(vk);
            var T2_first_part = numeric.neg( selArr(yk, neg_vk ));
            var T2_second_part = selArr(vk, neg_vk);
            var T2 = arrayMin( numeric.div( T2_first_part , T2_second_part ) );

            var theta = 0.99995 * Math.min(T1, T2);
            if (!theta) {
                noready = false;
                theta = 0;
            }

            // Step 3
            var mk = numeric.div(nd( na(xk, numeric.mul(theta,uk)), na(yk, numeric.mul(theta, vk))),
                this.n * this.n);

            var Uk = numeric.diag(uk);
            var Vk = numeric.diag(vk);

            d_FirstPart = na(na(nn(nd(nd(Xk,Yk),e)),nd(mk,e)),nn(nd(nd(Uk,Vk),e)));
            d_SecondPart = na(na(nn(nd(nd(AtA,Xk),e)),nd(Yk,e)), Atb);

            d = d_FirstPart.concat(d_SecondPart);
            var zw = nd(numeric.inv(C), d);
            var zk = zw.slice(0, this.n);
            var wk = zw.slice(this.n, 2*this.n);

            // Step 4
            var neg_zk = findNeg(zk);
            T1_first_part = numeric.neg( selArr(xk, neg_zk ));
            T1_second_part =             selArr(zk, neg_zk);
            T1 = arrayMin( numeric.div( T1_first_part, T1_second_part) );

            var neg_wk = findNeg(wk);
            var T2_first_part = numeric.neg( selArr(yk, neg_wk ));
            var T2_second_part = selArr(wk, neg_wk);
            var T2 = arrayMin( numeric.div( T2_first_part , T2_second_part ) );

            theta = 0.99995 * Math.min(T1, T2);
            if (!theta) {
                noready = false;
                theta = 0;
            }

            xk = na(xk, numeric.mul(theta,zk));
            yk = na(yk, numeric.mul(theta,wk));

            // Step 5
            if ( ( nd(xk,yk) < this.tol1 ) && ( numeric.norm2(ns(ns(nd(AtA,xk),Atb),yk)) < this.tol2 ) )
                noready = false;
            else if (k == this.maxiter)
                noready = false;

            noready = false;
        }

        var x = xk;
        var y = yk;

        return [x,y];
    }
}