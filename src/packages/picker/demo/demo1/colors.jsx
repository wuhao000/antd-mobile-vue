export default function getColors(h) {
    const colorStyle = {
        display: 'inline-block',
        verticalAlign: 'middle',
        width: '16px',
        height: '16px',
        marginRight: '10px',
    };
    return [
        {
            label: (<div>
            <span style={Object.assign(Object.assign({}, colorStyle), { backgroundColor: '#FF0000' })}/>
            <span>红色</span>
          </div>),
            value: '#FF0000'
        },
        {
            label: (<div>
            <span style={Object.assign(Object.assign({}, colorStyle), { backgroundColor: '#00FF00' })}/>
            <span>绿色</span>
          </div>),
            value: '#00FF00'
        },
        {
            label: (<div>
            <span style={Object.assign(Object.assign({}, colorStyle), { backgroundColor: '#0000FF' })}/>
            <span>蓝色</span>
          </div>),
            value: '#0000FF'
        }
    ];
}
//# sourceMappingURL=colors.jsx.map