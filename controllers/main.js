
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
            const number = (1400/req.body.number)*((req.body.time)/365); 
            res.json(number.toFixed(2));
        }
    }
}