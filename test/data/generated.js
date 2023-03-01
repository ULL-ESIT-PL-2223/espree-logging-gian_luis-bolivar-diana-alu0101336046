const opt = function (x = 1) {
    console.log(`Entering <anonymous function>(${ x } = 1) at line 1`);
    return x;
};
opt();
opt(2);