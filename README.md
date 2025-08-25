# magenta-clockwork-registration

This application was developed as a MVP for T-Systems as part of a university assignment.
It aims to provide access to a MySQL-DB via a REST-API and a basic in-memory-cache, build with Node, Express and Sequelize.
Additionally there are three frontends, that access the server in a repository pattern. Each of the frontends are built as a seperate Vue.js-Application.


The purpose of the app is further explained in the [conceptual formulation](https://magenta-clockwork-demo.herokuapp.com/documents/Thema1_ClockworkMagenta_Registration_MMS.pdf) (sadly, german only).
To simulate the apps dataflow, follow the order on the hosted app [here](https://magenta-clockwork-demo.herokuapp.com/overview) from left to right.

You can register any number of visitors, which then would be rated in the backoffice.
The marketing workers would then look up the visitor in the Sales-view and innitiate a conversation at the actual fair.
The connection to the spirograph was cut out for the sake of this demo.
