// require all modules ending in "_test" from the
// current directory and all subdirectories

//var testsContext = require.context(".", true, /.spec\.(js|jsx)$/);
var testsContext = require.context(".", true, /Todo.spec\.(js|jsx)$/);

//var testsContext = require.context(".", true, /CreateLabel.spec\.(js|jsx)$/);
//var testsContext = require.context(".", true, /VisibilityFilters.spec\.(js|jsx)$/);
//var testsContext = require.context(".", true, /TodoReducers.spec\.(js|jsx)$/);

testsContext.keys().forEach(testsContext);
