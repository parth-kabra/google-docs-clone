import React, { useEffect } from "react";
import Doc from "../img/images/doc.png";
import Share from "../img/svg/share.svg";
import "../css/header.css";
import Editor from "./editor";


// Function to generate random text of a given length
function generateRandomText(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let randomText = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		randomText += characters.charAt(randomIndex);
	}

	return randomText;
}

// Function to shorten a given URL using the TinyURL API
async function shortenUrl(longurl) {
	const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longurl)}`);
	return await response.text();
}

const CryptoJS = require('crypto-js');

// Function to convert a string to its hexadecimal representation
function stringToHex(str) {
	let hex = '';
	for (let i = 0; i < str.length; i++) {
		hex += str.charCodeAt(i).toString(16);
	}
	return hex;
}

// Function to encrypt text using AES encryption with a given key
function encryptText(text, key) {
	const keyWordArray = CryptoJS.enc.Utf8.parse(key);
	const encryptedText = CryptoJS.AES.encrypt(text, keyWordArray, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});

	const encryptedHex = stringToHex(encryptedText.toString());

	return encryptedHex;
}

const encryptionKey = 'SecretKey123';


export default function Header() {
	// Function to change the document title based on the input value
	function changeDocTitle() {
		let name = document.getElementById("doc__name").value;

		// Remove trailing spaces from the name
		while (name[name.length - 1] === " ") {
			name = name.substr(0, name.length - 1);
		}

		if (!name.length) {
			// Set default title if the name is empty
			document.title = "Untitled Document - Google Docs Clone";
			document.getElementById("doc__name").value = "Untitled Document";
		} else {
			// Set the document title to the provided name
			document.title = name;
		}
	}

	useEffect(() => {
		// Initialize the document name and title
		document.getElementById("doc__name").value = "Untitled Document";
		document.title = "Untitled Document - Google Docs Clone";

		// Media query for responsive design
		var mediaQuery = window.matchMedia("(max-width: 805px)");
		const text = document.querySelector(".ellipsis");

		mediaQuery.addListener((query) => {
			// Change the text based on media query matches
			if (query.matches) {
				text.innerText = "........";
			} else {
				text.innerText = "Format";
			}
		});
	}, []);

	// List of options in the header
	const options = ["File", "Edit", "View", "Insert", "Format", "Tools", "Extensions", "Help"];


	function generateDocument(){
		const element = document.getElementById("editor")
		const html = element.innerHTML
		const encryption = encryptText(html, encryptionKey)
		const link =`${window.location.href}document/${encryption}`
		shortenUrl(link).then((url)=>{
			console.log(url)
			navigator.clipboard.writeText(url)
			.then(() => {
				console.log("Text copied successfully!");
			})
			.catch((error) => {
				console.error("Unable to copy text: ", error);
			});
	
		})

		document.getElementById("share__p").innerText = "Copied"
		setTimeout(()=>{
			document.getElementById("share__p").innerText = "Share"
		}, 1000)

		//window.open(`/document/${encryption}`, "_blank")
	}

	return (
		<div className="main__header">
			<section className="header">
				<span className="doc__info">
					<img src={Doc} className="logo" />
					<span className="doc__edit">
						<span>
							<input className="doc__name" maxLength={50} id="doc__name" onChange={changeDocTitle} />
							<i className="bx bx-star"></i>
							<i className="bx bx-folder-plus"></i>
							<i className="bx bxl-google-cloud"></i>
						</span>

						<span className="options">
							{options.map((option, index) => (
								<p key={index} className={`option ${index === 4 ? "ellipsis" : ""}`}>
									{option}
								</p>
							))}
						</span>
					</span>
					<span className="user">
						<i className="bx bx-history"></i>
						<i className="bx bx-comment-detail"></i>
						<i className="bx bx-video"></i>
						<span>
							<a className="share__doc button" onClick={generateDocument} id="share__doc">
								<img src={Share} />
								<p id="share__p">Share</p>
							</a>
							<span id="share__doc_copy" style={{display:"none"}}>
								<a className="share__doc button" >
									<img src={Share} />
									<p>Share</p>
								</a>
							</span>

						</span>
						<img src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${generateRandomText(3)}`} className="avatar" />
					</span>
				</span>
			</section>
			<span id="main_editor">
				<Editor />
			</span>
		</div>
	);
}
