import * as React from 'react';
import styles from './CrudWebpart.module.scss';
import { ICrudWebpartProps } from './ICrudWebpartProps';
import { Dropdown, IDropdownOption } from '@fluentui/react';
import { Environment } from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientResponse,SPHttpClientOptions } from '@microsoft/sp-http';
// import { ICrudArrOfList } from './ICrudWebpartList';

const CrudWebpart: React.FC<ICrudWebpartProps> = (props) => {
  const option: IDropdownOption[] = [];
  const  [createList,setCreateList] = React.useState<any>({
    listName : "",
    listDescription : ""
  })

  // const [listData, setListData] = React.useState<ICrudArrOfList[]>([]); // Use an array for list data
  // const fetchDataFromSharepoint = () => {
  //   const spHttpClient: SPHttpClient = props.context.spHttpClient;
  //   const listUrl: string = `${props.context.pageContext.web.absoluteUrl}/_api/web/lists`;

  //   spHttpClient.get(listUrl, SPHttpClient.configurations.v1)
  //     .then((response: SPHttpClientResponse) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         console.error(`Error: ${response.statusText}`);
  //         throw new Error('Failed to retrieve data from the lists.');
  //       }
  //     })
  //     .then((data: ICrudArrOfList[]) => {
  //       setListData(data); // Update the state with fetched data
  //     })
  //     .catch((error: any) => {
  //       console.error('Error:', error);
  //     });
  // };

  // React.useEffect(() => {
  //   fetchDataFromSharepoint();
  // }, []);


  const handleInputs=(event:any)=>{
    setCreateList(
     [ event.target.name] =event.target.value
    )
  }
  const checkAndCreateList=()=>{
    const listUrl = props.context.pageContext.web.absoluteUrl + `_api/web/lists/GetByTitle(`${createList.listName}`)`
    props.context.spHttpClient.get(listUrl,SPHttpClient.configurations.v1)
    .then(response:SPHttpClientResponse)=>{
      if(Response.status==200){
        alert("list alredy exists")
      }if(Response.status==404){
        const url :string = props.context.pageContext.web.absoluteUrl + `_api/web/lists`
        const listDefination: any={
          "Title" : createlist.listname,
          "Description" : createList.listDescription,
          "AllowContentTypes": true,
          "BaseTemplate":10,
          "ContentTypesEnabled" : true
        }
        const sp
      }
    }
  }
  const handleSubmit=(event:any)=>{
    event.preventDefault();
    checkAndCreateList()

  }

  return (
    <section className={styles.crudContainer}>
      <h1>Crud Operations</h1>
      <h1>Environment: {Environment}</h1>
      <h2>Environment-Type: {Environment.type}</h2>
      <h2>Culture Name: {props.context.pageContext.cultureInfo.currentCultureName}</h2>
      <h2>Current culture UI Name: {props.context.pageContext.cultureInfo.currentUICultureName}</h2>
      <h2>Is Right to Left: {props.context.pageContext.cultureInfo.isRightToLeft}</h2>
      <div>
        <Dropdown className={styles.dropdown} options={option}></Dropdown>
      </div>
      {/* <div>
        {listData.map((eachEle,index) => (
          // Render your list data here, adjust the rendering logic as needed
          <div key={index}>
            <h3>{eachEle}</h3>
          </div>
        ))}
      </div> */}
      <h1>creating the webpropert pane accesible by users with text feilds</h1>
      <div>
        <h3>{props.description}</h3>
        <h3>{props.bilamount}</h3>
        <h3>{props.quantity}</h3>
        <h3>{props.productname}</h3>
        <h3>{props.prodcutcost}</h3>
        <h3>{props.netbillamt}</h3>
        <h3>{props.productdescription}</h3>
      </div>
      <h1>Creating a new list using sphttpclient</h1>
      <form>
        <label>list Name</label>
        <input onChange={handleInputs}/>
        <label>list Name</label>
        <input onChange={handleInputs}/>
        <button onSubmit={handleSubmit}/>
      </form>
    </section>
  );
};

export default CrudWebpart;
