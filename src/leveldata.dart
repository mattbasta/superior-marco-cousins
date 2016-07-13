library leveldata;

var LEVELS = [{"height":33,"width":256,"content":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQCAwIDAgMCAwIDAgMCAwIDAgMCAwIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREAAAAAAAAAAAAREQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAREQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQREREEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAREQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAABAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEAAAAAAAAAAAAAAAABAAAAAAEAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQCBAQAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQCAgIEBAQEAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAABAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAgICAgICAgICBAAAAAAAAAAABBEREREEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQAAAAAAAAAAAAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwREQAAAAAAAAAAAAAAAAAAAAAAAAAAGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAAAAAAAAAAAAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXAAAAAAAAAAAAAAAAAAAAAAAAAAALCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDAwMDAwMEgAAAAAAAAAAAAAAAAAAAAAAAAAABAQEERERERIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBwcHBwcHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAEAAADAAADAAAAAAAEgAAAAAAAAAAAAEBAAAAAAAAAQEAAAAAAAABAQAAAAAAAAQRERERBAAAAAAAAAAACwsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAAAAAAAAAAAAAAwMDAwMABIAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgYGBgYGBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAwAAAwAAAAAABIAAAAAAAAAAAABAQAAAAAAAAEBAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAABwcHBwcHBwcHBwcHBwcHBwcHAAAAAQAAAAEAAAAHBwAAAAAAAAAAAAAAAAAAAAsAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAGBgYGBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAAAAAAAQAAALAAALAAAAAAASAAAAAAAXAAAAAQEAAAAAAAABAQAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAIDAgYGBgYGBgYGBgYGBgYGBgAAAAAAAAAAAAAABgYAAAAAAAAAAAAAAAAAAAALAAAAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABARIAAQEBAQEBAQcHBwcHBwcHBwcHBwcHBwAHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcAAAAAAAAAAAAAAAAAAAADAwMDBgYGBgYGBgYGBgYGBgYAAAAAAAAAAAAAAAYGAAAAAAAAAAAAAAAAAAAACwAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAQBAAAAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEFAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQASAAAAAAAAAAEGBgYGBgYGBgYGBgYGBgYABgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGAAAAAAAAAAAAAAAAAAAAAAMCAwYGBgYGBgYGBgYGBgYGAAAAAAAAAAAAAAAGBgcAAAAAAAAAAAAAAAAAAAsAAAASAAAAAAAAAAAAAAAYAAAAAAAAAAAAAQAAAAAAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEFBQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBwEAEgAAAAAAAAABBgYGBgYGBgYGAAAAAAAAAAYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgAAAAAAAAAAAAAAAAAAAAAAAwMDAgMDBgYGBgYGBgYGBgAAAAAAAAAAAAAABgYGAAAAAAAAAAAAAAAAAAALAAAAEgAAAAAAAAAAAAAEBAQAAAAAAAAAAAEAAAAAABIAGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEFBQUBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcHBgYBBQUFBQASBQUFAQYGBgYGBgYGBhEGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMGBgYGBgYGBgYAAAAAAAAAAAAAAAYGBgAAAAAAAAAAAAAAAAAACwAAABIAABcAAAAAAAAAAAEAAAAAAAAAAAABAAAAAAASAAUFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAEFBQUFAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcGBgYGAQAAAAAAEgAAAAEGBgYGBgYGBgAABgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwYGBgYGBgYGAAAAAAAAAAAAAAAGBgYHAAAAAAAAAAAAAAAAAAsAAAQEBAQEAAAAAAAAAAABAAAAAAAAAAAEAQAAAAAAEgUFBQUAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAEFBQUFBQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBwcGBgYGBgEAAAAAABIAAAABBgYGBgYGBgYAAAYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYAAAAAAAAADAAMAAAAAAAAAAAAAAAAAAMGBgYGBgYGBgAAAAAAAAAAAAAABgYGBgAAAAAAAAAAAAAAAAALAAAAAAEAAAAAAAAAAAAAAQAAAAAAAAAAAAEAAAAAAAUFBQUFBQAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAEFBQUFBQUBAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcHBgYGBgYGBgYBAAAAAAASABcAAAAAAAAAAAAAAAAAAAAAAAYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYAAAAAAAAAAAwADAAAAAAAAwMAAAAAAAADBgYGBgYGBgYAAAAAAAAAAAAAAAYGBgYAAAAAFwAAAAAAAAAACwAAAAABAAAAAAAAAAAAAAEEAAAAAAAAAAABAAAAAAACAgICAgIAAAAAAAAAAAAAAAAAAAAXAAAAAAsAAAEFBQUFBQUFAQAAAAAVFgAAAAAAAAAAAAAAAAAABAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXAAAAAAAAAAAAAAAABwcGBgYGBgYGBgYGBQUFBQUFBQUFBQUGBgYGBgYGBgYGBgYGAAAGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGAAAAAAAAAAALAAsAAAADAwMDAwAAAAAAAgYGBgYGBgYGAAAAAAAAAAAAAAAGBgYGBwAABAQEBAQREQAAAAsAAAAAAQAAAAAAAAAAAAABAAAAAAAAAAAAAQAAAAAABAICAgIEAAAAAAAAAAAAAAARERERBAcHBwcHBwcHBwcHBwcHBwcHBwcHAQEKCgoKCgEHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwAAAAAAAAAHBwcHBwcHBwEREREREQEHBwYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgoKBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgAAAAAAAAAHBwcHBwIDAwIDAwMAAAAAAAMGBgYGBgYGBgAAAAAAAAAAAAAABgYGBgYAAAAAAQAAAAAAAAALAAAAAAEAAAAAAAAAAAAAAQAAAAAAAAAABAEAAAAAAAQCAgICBAAAAAAAAAAAAAAAAAAAAAAGBgYGBgYGBgYGBgYGBgYGBgYGBgYBCgoKCgoBBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYAAAAAAAAABgYGBgYGBgYBAAAAAAABBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYKCgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYAAAAAAAAABgYGBgYDAwMDAwMCAwAAAwMDBgYGBgYGBgYAAAAAAAAAAAAAAAYGBgYGAAAAAAEAAAAAAAAACwAAAAABAAAAAAAAAAAAAAEAAAAAAAAAAAABAAAAAAQBAQEBAQEEEREREQAAAAAAAAAAAAAAAAYGBgYGBgYGBgYGBgYGBgYGBgYGAQoKCgoKAQYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgAAAAAABgYGBgYGBgYGAQoKCgoKAQYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGCgoGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGAAAAAAAAAAYGBgYGAwMCAwMDAwMDAwMCAwYGBgYGBgYGAAAAAAAAAAAAAAAGBgYGBgAAAAABAAAAAAAAAAsAAAAAAQAAAAAAAAAAAAABBAAAAAAAAAAAAQAAAAABAQEBAQEBAQAAAAAAAAAAAAAAAAAAAAAGBgYGBgYGBgYGBgYGBgYGBgYGBgEKCgoKCgE=","entities":[{"id":0,"x":11,"y":9},{"id":0,"x":17,"y":14},{"id":0,"x":26,"y":14},{"id":0,"x":27,"y":14},{"id":0,"x":28,"y":14},{"id":0,"x":30,"y":18},{"id":0,"x":32,"y":17},{"id":0,"x":29,"y":6},{"id":0,"x":44,"y":7},{"id":0,"x":48,"y":30},{"id":0,"x":59,"y":30},{"id":0,"x":83,"y":19},{"id":0,"x":84,"y":19},{"id":0,"x":102,"y":24},{"id":0,"x":103,"y":24},{"id":0,"x":131,"y":20},{"id":0,"x":134,"y":18},{"id":0,"x":135,"y":19},{"id":0,"x":131,"y":17},{"id":0,"x":135,"y":4},{"id":0,"x":133,"y":4},{"id":0,"x":151,"y":17},{"id":0,"x":151,"y":15},{"id":0,"x":202,"y":29},{"id":0,"x":203,"y":29},{"id":0,"x":204,"y":29},{"id":0,"x":205,"y":29},{"id":0,"x":206,"y":30},{"id":0,"x":207,"y":30},{"id":0,"x":208,"y":29},{"id":0,"x":201,"y":30},{"id":0,"x":200,"y":30},{"id":0,"x":199,"y":30},{"id":0,"x":219,"y":7},{"id":0,"x":220,"y":7},{"id":0,"x":191,"y":2},{"id":0,"x":199,"y":4},{"id":0,"x":191,"y":6},{"id":0,"x":199,"y":8},{"id":0,"x":175,"y":14},{"id":0,"x":173,"y":15},{"id":5,"x":17,"y":3},{"id":5,"x":41,"y":3},{"id":5,"x":41,"y":8},{"id":5,"x":203,"y":15},{"id":5,"x":203,"y":16},{"id":0,"x":202,"y":25},{"id":0,"x":203,"y":25},{"id":0,"x":204,"y":25},{"id":0,"x":202,"y":26},{"id":0,"x":203,"y":26},{"id":0,"x":204,"y":26},{"id":15,"x":29,"y":14},{"id":15,"x":36,"y":3}]},{"height":33,"width":256,"content":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAUAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREEAAAFERERBAAbAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAABQAABQAAAAEBAQEBAAAAAQEBBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAREREQUAAAUREREBAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAUAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAFAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAEBERERAQAEAAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABERERBQAABREREQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAABcAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAMAAwAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAUAAAUAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAABBERERERBAEEAQEEEREAAAAAEREEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDAwAAAAAAAAAAAAAAAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgADAAMAAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREFAAAFERERAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAQMDAQAAAAAAAAASAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAwAAAAAACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAERERAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAABQAABQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAEDAwEAAAAAAAAAEgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAAAAAAAAAAAAAAMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAMAAwQAAAsAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAREREQQAAAQREREBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAABAwMBGQAAAAAAABIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAAAAAAAAADAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgADAAMBBgYGBgYBAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAAAAAAAAAAAAAAAAABAEBBAQAAAAAAAASAQAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAEBwcHBAAAAAAAAAAAAAAMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAwAABAEBAQEBBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARAAAAAAAAEQAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAAEgAAAAAAAAAAAAAAAAAAAAEAAAASAAAAAAAAEgEAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAwMDAwMAAAAAAAAAAAAADAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAMDAAUDAwMDAwUAAwMREREAAAAAAAAREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQQREREBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAABIAAAAAAAAAAAAAAAAAAAABAAAEEgAAAAAAABIBAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAwAFAwAAAAMFAAMAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAFAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAASAAASAAAAAAAAAAAAAAAAAAAAAQAAARIAABIAAAASAQAAAAAAAAAAAAwMDAAAAAAACwAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAALCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAwMABQUAAAAFBQADAAASAAAAERERAAAAAAAREREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABERERAQAABREREQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAEgAAEgAAAAAAAAAAAAAAAAAAAAEAAAEAAAASAAAAEgEAAAAAAAAAAAAMDAwAAAAAAAsAAAAMDAwAAAAAAAAAAAAAAAAAAAAAAAQHBwcHBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAMAAAAAAAAAAAAAAwAAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAUAAAUAAAABBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAABIAABIAAAAAAAAAGAAAAAAAAAABAAABAAAAEgAAABIBAAAAAAAAAAAADAwMAAAAAAALCwsMDAwMDAAAAAAAAAAAAAAAAAAAAAADAwMDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgADAAMDAxEREQMDAAMAABIAAAAAAAAAAAAADAwMDAwAAAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREREFAAAFERERAQQEAAAAAAAAAAAAAAAAABcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcAAAAAAAASAAASAAAAAAAAAAAAAAQREREREQQAAQAAAQAAAAAAAAASAQAAAAAAAAAAAAALAAAAAAAACwAAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAwAAAAMAEgAABAAEAAASAAAAAAAAAAAADAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAABQAABQAAAAEEBAQAAAAAAAAREREEAAARAAAAABERAAAAAAAREQAAAAAAEREAAAAAAAAAABEFEQAAAAAAEgAAEgAAAAAAAAAAAAAAAAAAABIAAAEAAAEAAAAAAAAAEgEAAAAAAAAAAAAACwAAAAAAAAsAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAMDAwADABIAAAAAAAAAEgAAAAwMDAAMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAREREQUAAAUREREEAAABAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAABIAAAAAAAAAAAAAAAAAAAAAAAASAAABAAABAAAAAAAAABIBAAAAAAAAAAAAAAsLCwsLCwsLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAQABAASAAAAAAAAABIAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAFAAAAAAAAAQAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAASAAAAAAAbAAAAAAAAAAAAAAAAEgAAAQAAAQAAAAAAAAASAQAAAAAAAAAAAAAAAAAACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAAAAAAAEgAAAAAAAAASAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAABERERBQAABREREQQREQEAAAAAAAAAAAABAAAAAAAAAAAAAAARAAAAAAAAEQAAAAAAABEAAAAAAAAFAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAABIAAAEAAAEAAAAAAAAAEgEAAAAAAAAAAAAAAAAAAAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAAAAAABIAAAAAAAAAEgAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAUAAAUAAAABAAABAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAASAAABAAABAAAAGgAAABIBAAAAAAAAAAAAAAAAAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAAAAAASAAAAAAAAABIAAAwMDAwMDAwLAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQREREEAAAEERERARERAQAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAURAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAEgAAAQAABAEBAQEBAQEBBAAAAAAAAAAAAAAAAAAMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAAAAAAAEgAAAAAAAAASAAAACwAMDAsACwAACwAMDAwLDAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAABIAAAEAFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAAAAAABIAAAAAAAAAEgAAAAsAAAALAAsAAAsADAwMCwALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAEAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAASAAAEAQEBAQEBAQEBAQEEAAAAAAAAAAAAAAAAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAAAAAASAAAAAAAAABIAAAALAAAACwALAAALAAALAAsACwAAAAAAAAAAABERAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAABkAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFwAAABIAAAAAAAAAEgAAAAAAAAASAAAACwAAAAsACwAACwAACwALAAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAEAQEBAQEBAQEBAQQBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAYAAAAABIAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAAAsAAAAAAAwMDAwMAAAAAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUWAAAAAAAAAAcHBwcHBwcHBwcHBwcHBwcHBwAAAAcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwAAAAAAAAAAAAAAAAAAAAAREQcHBwcHBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgcHBwcHBwAAAAAHBwcAAAAABwcHAAAAAAcHBwAAAAABAQEAAAAABwcHAAAAAAcHBwcHBwcHBBERERERBAAAAAAAAAAAAAAAAAAREQcHBwcHBwAAAAAAAAALAAAAAAAADAwMAAAAAAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwcBAQEKCgoKCgEGBgYGBgYGBgYGBgYGBgYGBgYAAAAGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYAAAAAAAAAAAAAAAAAAAAAAAAABgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYAAAAABgYGAAAAAAYGBgAAAAAGBgYAAAAAAQEBAAAAAAYGBgAAAAAGBgYGBgYGBgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBgYGBgYAAAAAAAAACwAAAAAAAAALAAAAAAAAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYGBgYBCgoKCgoBBgYGBgYGBgYGBgYGBgYGBgYGCgoKBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYAAAAAAAAAAAAAAAAAAAAAAAAAAAYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGAAAAAAYGBgAAAAAGBgYAAAAABgYGAAAAAAEBAQAAAAAGBgYKCgoKBgYGBgYGBgYGAAAAAAAAAAAAAAAAAAAAAAAAAAAABgYGBgYGAAAAAAAAAAsAAAAAAAAACwAAAAAAAAAACwAAAAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBgYGAQoKCgoKAQYGBgYGBgYGBgYGBgYGBgYGBgoKCgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgAAAAAGBgYAAAAABgYGAAAAAAYGBgAAAAABAQEAAAAABgYGCgoKCgYGBgYGBgYGBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAYGBgYGBgAAAAAAAAALAAAAAAAAAAsAAAAAAAAAAAsAAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgYGBgEKCgoKCgE=","entities":[{"id":0,"x":28,"y":7},{"id":0,"x":30,"y":6},{"id":0,"x":37,"y":7},{"id":0,"x":42,"y":6},{"id":0,"x":40,"y":7},{"id":0,"x":15,"y":16},{"id":0,"x":23,"y":20},{"id":0,"x":16,"y":25},{"id":0,"x":14,"y":25},{"id":0,"x":7,"y":27},{"id":0,"x":34,"y":8},{"id":0,"x":49,"y":6},{"id":0,"x":58,"y":7},{"id":0,"x":58,"y":12},{"id":0,"x":70,"y":9},{"id":0,"x":69,"y":11},{"id":0,"x":71,"y":11},{"id":0,"x":77,"y":9},{"id":0,"x":77,"y":11},{"id":0,"x":77,"y":13},{"id":0,"x":77,"y":15},{"id":0,"x":70,"y":30},{"id":0,"x":69,"y":28},{"id":0,"x":71,"y":28},{"id":0,"x":85,"y":25},{"id":0,"x":84,"y":22},{"id":0,"x":83,"y":19},{"id":0,"x":86,"y":22},{"id":0,"x":87,"y":19},{"id":0,"x":84,"y":16},{"id":0,"x":86,"y":16},{"id":0,"x":85,"y":13},{"id":0,"x":6,"y":28},{"id":0,"x":8,"y":28},{"id":0,"x":5,"y":27},{"id":0,"x":9,"y":27},{"id":0,"x":44,"y":28},{"id":0,"x":43,"y":29},{"id":0,"x":45,"y":29},{"id":0,"x":44,"y":29},{"id":0,"x":44,"y":30},{"id":0,"x":43,"y":30},{"id":0,"x":45,"y":30},{"id":0,"x":45,"y":28},{"id":0,"x":43,"y":28},{"id":0,"x":104,"y":22},{"id":5,"x":34,"y":4},{"id":5,"x":40,"y":23},{"id":5,"x":95,"y":4},{"id":5,"x":95,"y":5},{"id":5,"x":111,"y":20},{"id":0,"x":111,"y":29},{"id":0,"x":112,"y":29},{"id":0,"x":110,"y":29},{"id":0,"x":111,"y":30},{"id":0,"x":110,"y":30},{"id":0,"x":112,"y":30},{"id":5,"x":148,"y":4},{"id":5,"x":148,"y":5},{"id":0,"x":148,"y":26},{"id":0,"x":149,"y":26},{"id":0,"x":141,"y":20},{"id":0,"x":143,"y":20},{"id":0,"x":118,"y":22},{"id":0,"x":111,"y":16},{"id":0,"x":104,"y":16},{"id":0,"x":118,"y":16},{"id":0,"x":155,"y":18},{"id":0,"x":156,"y":17},{"id":0,"x":155,"y":16},{"id":0,"x":156,"y":15},{"id":0,"x":155,"y":14},{"id":0,"x":156,"y":13},{"id":0,"x":155,"y":12},{"id":0,"x":156,"y":11},{"id":0,"x":177,"y":16},{"id":0,"x":181,"y":7},{"id":0,"x":189,"y":14},{"id":0,"x":189,"y":4}]}];