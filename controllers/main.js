
module.exports = function(){
    return {
        SetRouting: function(router){
            router.get('/', this.indexPage);

            router.post('/success', this.success);
        },
        indexPage: function(req, res){
            res.render('index');
        },
        success: function(req, res){
            var number = (1400/req.body.number)*((req.body.time)/365).toFixed(2);
            const name = req.body.name;
            res.render('Result.ejs', { result: number, name: name});
        }
    }
}