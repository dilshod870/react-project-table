import React from 'react';
import ReactPaginate from 'react-paginate';
import Loader from "./Loader/Loader";
import Table from "./Table/Table";
import DetailRowView from "./DetailRowView/DetailRowView";
import ModeSelector from "./ModeSelector/ModeSelector";
import TableSearch from "./TableSearch/TableCreate";
import lodash from 'lodash';


class App extends React.Component {

    state = {
        isModeSelect:false,
        isLoading: false,
        data:[],
        sort: 'asc',
        sortField: 'id',
        row:null,
        currentPage:0
    }

    async fetchData(url) {
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            isLoading: false,
            data:lodash.sortBy(data,this.state.sortField,this.state.sort)
        })

        console.log(data);
    }

    onSort = (sortField) =>  {
        const clonedData = this.state.data.concat();
        const sortType = this.state.sort === 'asc' ? 'desc' : 'asc';
        const orderedData = lodash.orderBy(clonedData,sortField,sortType)
        this.setState({
            data: orderedData,
            sort: sortType,
            sortField:sortField
        })
        //console.log(sortType);
    }

    onRowSelect = (row) => {
        this.setState({
            row:row,
        })
        console.log(row);
    }

    modeSelectHandler = (url) => {
        this.setState({
            isModeSelect:true,
            isLoading: true,
        })

        this.fetchData(url);
        //console.log(url);
    }

    pageChangeHandler = (page) => {
        this.setState({currentPage:page.selected})
        //console.log(page.selected);
    }

    render() {

        const pageSize = 10;

        const pageCount = this.state.data.length / pageSize;


        const displayData = lodash.chunk(this.state.data,pageSize)[this.state.currentPage]

        if (!this.state.isModeSelect){
            return (
                <div className='container'>
                    <ModeSelector onSelect={this.modeSelectHandler}/>
                </div>
            )
        }
        return (
            <div className="container">
                {
                    this.state.isLoading
                    ? <Loader/>
                    : <React.Fragment>
                        <TableSearch/>
                        <Table
                            data={displayData}
                            onSort={this.onSort}
                            sort={this.state.sort}
                            sortField={this.state.sortField}
                            onRowSelect={this.onRowSelect}
                        />
                        </React.Fragment>
                }

                {
                    this.state.data.length > pageSize
                    ? <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.pageChangeHandler}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            nextClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextLinkClassName={"page-link"}
                        />
                        :null
                }

                {
                    this.state.row
                    ? <DetailRowView person={this.state.row}/>
                    : null
                }

            </div>
        );
    }
}

export default App;
