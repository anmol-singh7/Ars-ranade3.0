export const tableTypeMap = {
  Clients: { tableHeads: ['Client ID', 'Client Name', 'Database No.'], displayFields: ['clientid', 'clientname', 'databaseNum'], endpoint: 'clients', deleteendpoint: 'deleteclient',addnew:'client' },
  Systems: { tableHeads: ['System ID', 'System Name'], displayFields: ['systemid', 'systemname'], endpoint: 'systems', deleteendpoint: 'deletesystem',addnew:'system' },
  Manufacturers: { tableHeads: ['Manufacturer ID', 'Manufacturer Name'], displayFields: ['manufacturerid', 'manufacturername'], endpoint: 'manufacturers', deleteendpoint: 'deletemanufacturer',addnew:'manufacturer' },
  Users: { tableHeads: ['User ID', 'User Name'], displayFields: ['userid', 'username'], endpoint: 'users', deleteendpoint: 'deleteuser',addnew:'user' },
  Reports: { tableHeads: ['Report ID', 'Report Name', 'Date', 'Status'], displayFields: ['reportid', 'reportname', 'datebegin', 'status1'], endpoint: 'reports', deleteendpoint: 'deletereport' },
};


export const inputdata = {
  user: { 
    fields: {username: "", employid: "", department: "", usertype: "", phonenumber: "", email: "", password: "", userstatus: "active" }, 
    fieldnames: [
                 ["User Name", 'username', 'text', "input"], 
                 ["Employ Id", 'employid', 'text', "input"], 
                 ["Department", 'department', 'text', "input"], 
                 ["User Type", 'usertype', 'text', "dropdown"], 
                 ["Phone Number", 'phonenumber', 'text', "input"], 
                 ["Email", 'email', 'text', "input"], 
                 ["Password", 'password', 'password', "input"]
                ], 
    endpoint: "addusers", 
    backpoint: "/dashboard"
  },
  system: { 
    fields: { systemid: '', systemname: '', logoid: '', logopath: '' }, 
    fieldnames: [
                 ["System Id",'systemid','text','input'],
                 ["System Name", "systemname", "text", "input"], 
                 ["Logo Id", "logoid", "text", "input"], 
                 ["Logo Path", "logopath", "text", "input"]
                ], 
    endpoint: "addsystems", 
    backpoint: "/dashboard" 
  },
  manufacturer: { 
    fields: { manufacturerid: '', manufacturername: '', logoid: '', logopath: '' }, 
    fieldnames: [
                 ['Manufacturer Id',"manufacturerid","text","input"],
                 ["Manufacturer Name", "manufacturername", "text", "input"], 
                 ["Logo Id", "logoid", "text", "input"], 
                 ["Logo Path", "logopath", "text", "input"]
                ], 
    endpoint: "addmanufacturer", 
    backpoint: "/dashboard" 
  },
  client: {
    fields:{clientid: "", clientname: "", hostofdatabase: "", userofdatabase: "", passwordofdatabase: "", databasename: "", waitForConnections: 1, connectionLimit: 5, queueLimit: 0,},
    fieldnames:[
                ["Client Id","clientid","text",'input'],
                ["Client Name","clientname","text",'input'],
                ['Host','hostofdatabase','text','input'],
                ['User','userofdatabase',"text","input"],
                ['Password','passwordofdatabase','password','input'],
                ['Database Name',"databasename",'text',"input"]
              ],
    endpoint:'/addCredential',
    backpoint:"/dashboard"  
  }
}