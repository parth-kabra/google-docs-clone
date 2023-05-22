import React, { useEffect, useRef, useState } from "react";
import "../css/tools.css";
import Select from 'react-select';
import { FontStyles, Fonts, customStyles, alignStyles, AlignPlaceholder, FontSizes, formatOptionLabel, Align, Colors, ColorsPlacehoder } from "../constants/dropdowns";
import "../css/editor.css";

export default function Editor() {
	const editorRef = useRef(null); // Ref for accessing the editor element
	const [currentBlockid, setCurrentBlockid] = useState(1); // State for tracking the current block ID
	const [blocks, setBlocks] = useState([{ id: 1, content: '' }]); // State for storing blocks of content
	const [currentFontFamily, setFontFamily] = useState('Arial'); // State for the current font family
	const [currentFontSize, setFontSize] = useState('11px'); // State for the current font size
	const options = ["File", "Edit", "View", "Insert", "Format", "Tools", "Extensions", "Help"]; // Array of options
	
	// Event handler for keydown events
	const handleKeyDown = (event, blockId) => {
		setCurrentBlockid(blockId);
	
		if (event.key === 'Enter') {
			event.preventDefault();
	
			const newBlockId = blockId + 1;
	
			const blockIndex = blocks.findIndex((block) => block.id === blockId);
			const updatedBlocks = [
				...blocks.slice(0, blockIndex + 1),
				{ id: newBlockId, content: '' },
				...blocks.slice(blockIndex + 1),
			];
			setBlocks(updatedBlocks);
	
			setTimeout(() => {
				const newBlockElement = document.getElementById(`block-${newBlockId}`);
				document.getElementById(`block-${newBlockId}`).style.fontSize = currentFontSize;
				document.getElementById(`block-${newBlockId}`).style.fontFamily = currentFontFamily;
				if (newBlockElement) {
					newBlockElement.focus();
				}
			}, 0);
		} else if (event.key === "ArrowUp" && blockId > 1) {
			const beforeElement = document.getElementById(`block-${blockId - 1}`);
			if (beforeElement) {
				beforeElement.focus();
			}
		} else if (event.key === "ArrowDown" && blockId < blocks.length) {
			const afterElement = document.getElementById(`block-${blockId + 1}`);
			if (afterElement) {
				afterElement.focus();
			}
		}
	};
	
	// Event handler for content changes in the editor
	const handleChange = (event, blockId) => {
		setCurrentBlockid(blockId);
		const blockIndex = blocks.findIndex((block) => block.id === blockId);
		const updatedBlocks = [...blocks];
		updatedBlocks[blockIndex].content = event.target.innerHTML;
		setBlocks(updatedBlocks);
	};
	
	// Function for handling different text types and applying styles
	const handleText = (text) => {
		const type = text.value;
		document.getElementById(`block-${currentBlockid}`).style.fontFamily = "Roboto";
	
		if (type == "normal") {
			document.getElementById(`block-${currentBlockid}`).style.fontSize = "25px";
		} else if (type == "title") {
			document.getElementById(`block-${currentBlockid}`).style.fontSize = "48px";
		} else if (type == "heading1") {
			document.getElementById(`block-${currentBlockid}`).style.fontSize = "40px";
			document.getElementById(`block-${currentBlockid}`).style.fontWeight = "bold";
		} else if (type == "heading2") {
			document.getElementById(`block-${currentBlockid}`).style.fontSize = "30px";
			document.getElementById(`block-${currentBlockid}`).style.fontWeight = "bold";
		} else {
			document.getElementById(`block-${currentBlockid}`).style.fontSize = "25px";
			document.getElementById(`block-${currentBlockid}`).style.fontWeight = "bold";
		}
	
		document.getElementById(`block-${currentBlockid}`).focus();
	};
	
	// Function for toggling font weight (bold)
	const handleFontBold = () => {
		const wgt = document.getElementById(`block-${currentBlockid}`).style.fontWeight;
		if (wgt === "bold") {
			document.getElementById(`block-${currentBlockid}`).style.fontWeight = "400";
		} else {
			document.getElementById(`block-${currentBlockid}`).style.fontWeight = "bold";
		}
		document.getElementById(`block-${currentBlockid}`).focus();
	};
	
	// Function for toggling font style (italic)
	const handleFontItalic = () => {
		const style = document.getElementById(`block-${currentBlockid}`).style.fontStyle;
		if (style === "italic") {
			document.getElementById(`block-${currentBlockid}`).style.fontStyle = "normal";
		} else {
			document.getElementById(`block-${currentBlockid}`).style.fontStyle = "italic";
		}
		document.getElementById(`block-${currentBlockid}`).focus();
	};
	
	// Function for toggling text underline
	const handleFontUnderline = () => {
		const deco = document.getElementById(`block-${currentBlockid}`).style.textDecoration;
		if (deco === "underline") {
			document.getElementById(`block-${currentBlockid}`).style.textDecoration = "none";
		} else {
			document.getElementById(`block-${currentBlockid}`).style.textDecoration = "underline";
		}
		document.getElementById(`block-${currentBlockid}`).focus();
	};
	
	// Function for toggling text strike-through
	const handleTextStrikeThrough = () => {
		const textDecoration = document.getElementById(`block-${currentBlockid}`).style.textDecoration;
		if (textDecoration.includes("line-through")) {
			document.getElementById(`block-${currentBlockid}`).style.textDecoration = "none";
		} else {
			document.getElementById(`block-${currentBlockid}`).style.textDecoration = "line-through";
		}
		document.getElementById(`block-${currentBlockid}`).focus();
	};
	
	// Function for highlighting text
	const handleHighlight = () => {
		const backgroundColor = document.getElementById(`block-${currentBlockid}`).style.backgroundColor;
		if (backgroundColor === "yellow") {
			document.getElementById(`block-${currentBlockid}`).style.backgroundColor = "transparent";
		} else {
			document.getElementById(`block-${currentBlockid}`).style.backgroundColor = "yellow";
		}
		document.getElementById(`block-${currentBlockid}`).focus();
	};
	
	// Function for aligning content
	const AlignContent = (align_val) => {
		document.getElementById(`block-${currentBlockid}`).style.textAlign = align_val.value;
		document.getElementById(`block-${currentBlockid}`).focus();
	};
	
	// Function for changing font size
	const ChangeFontSize = (font_size_val) => {
		setFontSize(`${font_size_val.value}px`);
		document.getElementById(`block-${currentBlockid}`).style.fontSize = `${font_size_val.value}px`;
		document.getElementById(`block-${currentBlockid}`).focus();
	};
	
	// Function for changing font family
	const ChangeFontFamily = (fontfamily) => {
		setFontFamily(fontfamily.value);
		document.getElementById(`block-${currentBlockid}`).style.fontFamily = fontfamily.value;
		document.getElementById(`block-${currentBlockid}`).focus();
	};
	
	// Function for changing text color
	const handleColorChange = (gradients) => {
		const shade = gradients.value;
		document.getElementById(`block-${currentBlockid}`).style.color = shade;
		document.getElementById(`block-${currentBlockid}`).focus();
	};
	
		return (
		<>
			<br />
			<div className="tools__main">
				<section className="tools">
					<i className='bx bx-undo'></i>
					<i className='bx bx-redo'></i>
					<span className="sep">&nbsp;</span>
					<Select
						onChange={handleText}
						options={FontStyles}
						placeholder={"Normal"}
						styles={customStyles}
						classNamePrefix={"selector"}
						isSearchable={true}
					/>
					<span className="sep">&nbsp;</span>

					<Select
						options={Fonts}
						placeholder={"Arial"}
						formatOptionLabel={formatOptionLabel}
						styles={customStyles}
						onChange={ChangeFontFamily}
						classNamePrefix={"selector"}
						isSearchable={true}
					/>
					<span className="sep">&nbsp;</span>

					<Select
						options={FontSizes}
						placeholder={"11"}
						styles={alignStyles}
						onChange={ChangeFontSize}
						classNamePrefix={"selector"}
						isSearchable={true}
					/>
					<span className="sep singh">&nbsp;</span>
					<i className='bx bx-bold singh' onClick={handleFontBold}></i>
					<i className='bx bx-italic singh' onClick={handleFontItalic}></i>
					<i className='bx bx-underline singh' onClick={handleFontUnderline}></i>
					<i className='bx bx-strikethrough singh' onClick={handleTextStrikeThrough}></i>
					<span className="singh">
						<Select
							options={Colors}
							placeholder={<ColorsPlacehoder />}
							formatOptionLabel={formatOptionLabel}
							styles={alignStyles}
							onChange={handleColorChange}
							classNamePrefix={"selector"}
							isSearchable={false}
						/>
					</span>

					<i className='bx bx-highlight singh' onClick={handleHighlight}></i>
					<span className="sep">&nbsp;</span>

					<i class='bx bx-image-alt hero'></i>
					<span className="hero">
						<Select
							options={Align}
							placeholder={<AlignPlaceholder />}
							styles={alignStyles}
							onChange={AlignContent}
							formatOptionLabel={formatOptionLabel}
							classNamePrefix={"selector"}
							isSearchable={false}
						/>
					</span>
				
					<span className="sep gep">&nbsp;</span>
					<i class='bx bx-list-check list_' ></i>
					<i class='bx bx-list-ul list_' ></i>
					<i class='bx bx-list-ol list_' ></i>
					<i class='bx bx-dots-vertical-rounded more'></i>
				</section>
			</div>

			<section className="text__editor">
				<div className="editor" id="editor" >
					{blocks.map((block) => (
						<div
							key={block.id}
							id={`block-${block.id}`}
							contentEditable
							onBlur={(event) => handleChange(event, block.id)}
							onKeyDown={(event) => handleKeyDown(event, block.id)}
							className={`block block__${block.id}`}
						>
							{block.content}
						</div>
					))}
				</div>
			</section>
		</>
	);
}
