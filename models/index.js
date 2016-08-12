var Sequelize = require('sequelize');
// var postgresURI = 'postgres://localhost:5432/wikistack';
// var db = new Sequelize('wikistack', 'ubuntu', 'cloud9',{ host: 'localhost', dialect: 'postgres'}, {logging:false});
var db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});

// var _conn;


var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }},{
        getterMethods: {
            route: function(){
                console.log('route');
                return '/wiki/' + this.urlTitle;
            }
        },
        hooks: {
            beforeValidate: function (page) {
                // console.log(this);
                console.log(page.title);
              if (page.title) {
                page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
              } else {
                page.urlTitle = Math.random().toString(36).substring(2, 7);
              }
        }
    }
});


var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        isEmail: true,
        allowNull: false
    }
});

// function connect(){
//     if(_conn)
//         return _conn;
//     _conn = new db.authenticate();
//     return _conn;
// };

// Page.belongsTo(User);
// User.hasName(Page);

module.exports = {
  Page: Page,
  User: User
  // connect: connect
};

