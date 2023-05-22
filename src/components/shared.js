import React, { useEffect, useRef, useState } from "react";
import "../css/tools.css";
import Select from 'react-select';
import { FontStyles, Fonts, customStyles, alignStyles, AlignPlaceholder, FontSizes, formatOptionLabel, Align, Colors, ColorsPlacehoder } from "../constants/dropdowns";
import "../css/editor.css";
import { useParams } from 'react-router-dom';
import Header from "./header";
const CryptoJS = require('crypto-js');

// Function to convert a hexadecimal string to its corresponding string representation
function hexToString(hex) {
	let str = '';
	for (let i = 0; i < hex.length; i += 2) {
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	}
	return str;
}

// Function to decrypt text using AES decryption with a given key
function decryptText(encryptedText, key) {
	const keyWordArray = CryptoJS.enc.Utf8.parse(key);
	const encryptedString = hexToString(encryptedText);
	const decryptedText = CryptoJS.AES.decrypt(encryptedString, keyWordArray, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return decryptedText.toString(CryptoJS.enc.Utf8);
}

const encryptionKey = 'SecretKey123';


const EncryptedContentDisplay = () => {
    const {content} = useParams();
    const doc = decryptText(content, encryptionKey)

    useEffect(()=>{
        const blocks = document.querySelectorAll(".block")
        blocks.forEach((block) =>{
            block.contentEditable = "false"
        })
        document.getElementById("main_editor").style.display = "none"
        document.getElementById("share__doc").style.display = "none"
        document.getElementById("share__doc_copy").style.display = "block"
    })

	return(
		<>
            <Header />
			<br />
			<div className="tools__main">
				<section className="tools">
					<i className='bx bx-undo'></i>
					<i className='bx bx-redo'></i>
					<span className="sep">&nbsp;</span>
					<Select
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
						classNamePrefix={"selector"}
						isSearchable={true}
					/>
					<span className="sep">&nbsp;</span>

					<Select
						options={FontSizes}
						placeholder={"11"}
						styles={alignStyles}
						classNamePrefix={"selector"}
						isSearchable={true}
					/>
					<span className="sep singh">&nbsp;</span>
					<i className='bx bx-bold singh' ></i>
					<i className='bx bx-italic singh'></i>
					<i className='bx bx-underline singh'></i>
					<i className='bx bx-strikethrough singh'></i>
					<span className="singh">
						<Select
							options={Colors}
							placeholder={<ColorsPlacehoder />}
							formatOptionLabel={formatOptionLabel}
							styles={alignStyles}
							classNamePrefix={"selector"}
							isSearchable={false}
						/>
					</span>

					<i className='bx bx-highlight singh'></i>
					<span className="sep">&nbsp;</span>

					<i class='bx bx-image-alt hero'></i>
					<span className="hero">
						<Select
							options={Align}
							placeholder={<AlignPlaceholder />}
							styles={alignStyles}
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
                    <div dangerouslySetInnerHTML={{ __html: doc }} />;

				</div>
			</section>
		</>
	);
};

export default EncryptedContentDisplay;
