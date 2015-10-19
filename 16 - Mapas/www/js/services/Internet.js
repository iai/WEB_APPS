services.factory('Internet', function(){

	return {
		online : function() {

			var wifi    = 'W';
			var cell_3G = '3';
			var cell_4G = '4';

			if(navigator.connection) {
				if(navigator.connection.type == Connection.CELL_3G)
					return cell_3G;
				else if(navigator.connection.type == Connection.CELL_4G)
					return cell_4G;
				else if(navigator.connection.type == Connection.WIFI || navigator.connection.type == Connection.ETHERNET)
					return wifi;
				else
					return false;
			}
			else if(navigator.onLine)
				return true;
			else
				return false;

		}
	}

});