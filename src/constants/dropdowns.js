const Fonts = [
    { value: 'Arial', label: `<p style="font-family: 'Arial' ">Arial` },
    { value: 'Impact', label: `<p style="font-family: 'Impact' ">Impact` },
    { value: 'Verdana', label: `<p style="font-family: 'Verdana' ">Verdana` },
    { value: 'Georgia', label: `<p style="font-family: 'Georgia' ">Georgia` },
    { value: 'Helvetica', label: `<p style="font-family: 'Helvetica' ">Helvetica` },
    { value: 'Roboto', label: `<p style="font-family: 'Roboto' ">Roboto` },
    { value: 'Lato', label: `<p style="font-family: 'Lato' ">Lato` },
    { value: 'Montserrat', label: `<p style="font-family: 'Montserrat' ">Montserrat` },
    { value: 'Nunito', label: `<p style="font-family: 'Nunito' ">Nunito` },
    { value: 'Lobster', label: `<p style="font-family: 'Lobster' ">Lobster` },
];

const FontStyles = [
    { value: 'normal', label: 'Normal' },
    { value: 'title', label: 'Title' },
    { value: 'heading1', label: 'Heading 1' },
    { value: 'heading2', label: 'Heading 2' },
    { value: 'heading3', label: 'Heading 3' },
];

const Colors = [
    {value: 'black', label:'<span class="black color"></span>'},
    {value: 'red', label: '<span class="red color"></span>'},
    {value: 'yellow', label: '<span class="yellow color"></span>'},
    {value: 'blue', label: '<span class="blue color"></span>'},
    {value: 'green', label: '<span class="green color"></span>'},
    {value: 'orange', label: '<span class="orange color"></span>'}
]

const FontSizes = [
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
    { value: 11, label: '11' },
    { value: 12, label: '12' },
    { value: 14, label: '14' },
    { value: 18, label: '18' },
    { value: 24, label: '24' },
    { value: 30, label: '30' },
    { value: 36, label: '26' },
    { value: 48, label: '48' },
    { value: 60, label: '60' },
    { value: 72, label: '72' },
    { value: 96, label: '96' },
];

const Align = [
    { value: 'left', label: `<i class='bx bx-align-left' ></i>` },
    { value: 'center', label: `<i class='bx bx-align-middle' ></i>` },
    { value: 'right', label: `<i class='bx bx-align-right' ></i>` },
    { value: 'justify', label: `<i class='bx bx-align-justify' ></i>` },
];


const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: 'transparent', 
        boxShadow: 'none',
        width:"120px",
        border:"none",
        fontSize:"15px", 
        color:"black",
        '&:hover': {
            borderColor: 'transparent',
            backgroundColor:"#e6e6e6",
            cursor:"pointer" 
        },
        '&:focus': {
            borderColor: 'transparent', 
            boxShadow: 'none',
            cursor:"pointer" 
        },
      }),
};

const alignStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: 'transparent', 
        boxShadow: 'none',
        width:"70px",
        border:"none",
        fontSize:"15px", 
        color:"black",
        '&:hover': {
            borderColor: 'transparent',
            backgroundColor:"#e6e6e6",
            cursor:"pointer" 
        },
        '&:focus': {
            borderColor: 'transparent', 
            boxShadow: 'none',
            cursor:"pointer" 
        },
      }),
};

const AlignPlaceholder = () => (
    <div>
        <i className='bx bx-align-left'></i>
    </div>
);

const ColorsPlacehoder = () => {
    return(
        <div>
            <i className='bx bx-font-color'></i>
        </div>  
    )
}

const formatOptionLabel = ({ label }) => (
    <div dangerouslySetInnerHTML={{ __html: label }} />
);

export {Fonts, ColorsPlacehoder, FontStyles, alignStyles, customStyles, AlignPlaceholder, FontSizes, formatOptionLabel, Align, Colors}