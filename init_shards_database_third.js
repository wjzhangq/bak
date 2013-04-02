dbu = db.getSisterDB("db_user");

admin = db.getSisterDB("admin");
shard_dbs_config = 
[
	{
		dbname:"db_user",
		collections:[
				{
					name:"t_user_avatar_log",
					key:{_id:1}
				},
		]
	}
];

for(var i = 0;i<shard_dbs_config.length;i++){
	var dbname = shard_dbs_config[i].dbname;
	printjson( admin.runCommand( {enablesharding : dbname} ) );

	for(var j = 0;j<shard_dbs_config[i].collections.length;j++){
		var col_obj = shard_dbs_config[i].collections[j];
		printjson(admin.runCommand( {shardcollection : dbname + "." + col_obj.name,key:col_obj.key} ) );
	}
}

admin.printShardingStatus();


