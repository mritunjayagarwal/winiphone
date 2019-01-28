
module.exports = function(User){
    return {
        SetRouting: function(router){
            router.get('/', this.indexPage);

            router.post('/success', this.success);
        },
        indexPage: function(req, res){
            res.render('index');
        },
        success: function(req, res){
            var newUser = new User();
            newUser.user = req.body.name;
            newUser.downlines = req.body.downlines;
            newUser.associated = req.body.associated;
            newUser.save(function(){
                var number = (1400/req.body.downlines)*((req.body.associated)/365).toFixed(2);
                const name = req.body.name;
                res.render('Result.ejs', { result: number, name: name});
            });
        }
    }
}