import React from 'react';

const ResultHeader = ({ header }) => <th >{header.charAt(0).toUpperCase() + header.slice(1)}</th>
const ResultContent = ({ result, header }) => <td >{result[header]}</td>

const Result = ({ result }) => {
    const renderResultHeader = () => {
        return Object.keys(result).map((header) => {
            return <ResultHeader key={header} header={header} />
        })
    }

    const renderResultContent = () => {
        return Object.keys(result).map((header) => {
            return <ResultContent key={header} result={result} header={header} />
        })
    }

    return (
        <div className="result">
            <table className="tblResult">
                <tbody>
                    <tr>
                        {renderResultHeader()}
                    </tr>
                    <tr>
                        {renderResultContent()}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Result