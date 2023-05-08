import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./FilterWindow.module.scss";
import { ArrowIcon } from "src/assets/icons";
import { Theme, useThemeContext } from "src/Context/Theme/Context";
import ModalWindow from "../ModalWindow";
import SelectComponent from "src/components/SelectComponent/SelectComponent";
import Button from "src/components/Button/Button";
import {
  ButtonType,
  FiltersType,
  ModalWindowType,
} from "src/utils/@globalTypes";
import { useDispatch } from "react-redux";
import {
  getAllMovies,
  setFiltersData,
  setModalWindow,
} from "src/redux/reducers/movieSlice";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "src/pages/Router";
import RangeComponent from "src/components/RangeComponent/RangeComponent";
import { getCurrentYear, getFilterRange } from "src/utils/functions";
import { Range } from "react-input-range";
import {
  FILTERS_RESET,
  RELEASED_RANGE,
  RUNTIME_RANGE,
  SCORE_RANGE,
} from "src/utils/constants";

type FilterProps = {
  filters: FiltersType;
  modalWindowType: ModalWindowType;
  // filterReset:
};

const FilterWindow: FC<FilterProps> = ({ filters, modalWindowType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { theme } = useThemeContext();

  const [animState, setAnimState] = useState(false);

  const [sortValue, setSortValue] = useState(filters.order);
  const [typeValue, setTypeValue] = useState(filters.type);
  const [countryValue, setCountryValue] = useState(filters.country);
  const [languageValue, setLanguageValue] = useState(filters.language);
  const [certificationValue, setCertificationValue] = useState(
    filters.certification
  );
  const [genreValue, setGenreValues] = useState<string[]>(filters.genre);
  const [yearState, setYearState] = useState<Range>(filters.released);
  const [runtimeState, setRuntimeState] = useState<Range>(filters.runtime);
  const [scoreState, setScoreState] = useState<Range>(filters.score);

  const orderOptions = [
    { value: "popularity:desc", label: "Popularity" },
    { value: "budget:desc", label: "Budget" },
    { value: "certification:desc", label: "Certification" },
    { value: "release_date:desc", label: "Release Date" },
    { value: "created_at:desc", label: "Date Added" },
    { value: "language:desc", label: "Language" },
    { value: "revenue:desc", label: "Revenue" },
    { value: "runtime:desc", label: "Runtime" },
    { value: "user_score:desc", label: "User Score" },
  ];

  const typeOptions = [
    { value: "movie", label: "Movies" },
    { value: "series", label: "TV Series" },
  ];

  const genreOptions = [
    { value: "romance", label: "Romance" },
    { value: "mystery", label: "Mystery" },
    { value: "horror", label: "Horror" },
    { value: "science fiction", label: "Science Fiction" },
    { value: "comedy", label: "Comedy" },
    { value: "thriller", label: "Thriller" },
    { value: "action", label: "Action" },
    { value: "drama", label: "Drama" },
  ];

  const countryOptions = [
    { label: "Andorra", value: "AD" },
    { label: "United Arab Emirates", value: "AE" },
    { label: "Afghanistan", value: "AF" },
    { label: "Antigua and Barbuda", value: "AG" },
    { label: "Anguilla", value: "AI" },
    { label: "Albania", value: "AL" },
    { label: "Armenia", value: "AM" },
    { label: "Netherlands Antilles", value: "AN" },
    { label: "Angola", value: "AO" },
    { label: "Antarctica", value: "AQ" },
    { label: "Argentina", value: "AR" },
    { label: "American Samoa", value: "AS" },
    { label: "Austria", value: "AT" },
    { label: "Australia", value: "AU" },
    { label: "Aruba", value: "AW" },
    { label: "Azerbaijan", value: "AZ" },
    { label: "Bosnia and Herzegovina", value: "BA" },
    { label: "Barbados", value: "BB" },
    { label: "Bangladesh", value: "BD" },
    { label: "Belgium", value: "BE" },
    { label: "Burkina Faso", value: "BF" },
    { label: "Bulgaria", value: "BG" },
    { label: "Bahrain", value: "BH" },
    { label: "Burundi", value: "BI" },
    { label: "Benin", value: "BJ" },
    { label: "Bermuda", value: "BM" },
    { label: "Brunei Darussalam", value: "BN" },
    { label: "Bolivia", value: "BO" },
    { label: "Brazil", value: "BR" },
    { label: "Bahamas", value: "BS" },
    { label: "Bhutan", value: "BT" },
    { label: "Bouvet Island", value: "BV" },
    { label: "Botswana", value: "BW" },
    { label: "Belarus", value: "BY" },
    { label: "Belize", value: "BZ" },
    { label: "Canada", value: "CA" },
    { label: "Cocos  Islands", value: "CC" },
    { label: "Congo", value: "CD" },
    { label: "Central African Republic", value: "CF" },
    { label: "Congo", value: "CG" },
    { label: "Switzerland", value: "CH" },
    { label: "Cote D'Ivoire", value: "CI" },
    { label: "Cook Islands", value: "CK" },
    { label: "Chile", value: "CL" },
    { label: "Cameroon", value: "CM" },
    { label: "China", value: "CN" },
    { label: "Colombia", value: "CO" },
    { label: "Costa Rica", value: "CR" },
    { label: "Serbia and Montenegro", value: "CS" },
    { label: "Cuba", value: "CU" },
    { label: "Cape Verde", value: "CV" },
    { label: "Christmas Island", value: "CX" },
    { label: "Cyprus", value: "CY" },
    { label: "Czech Republic", value: "CZ" },
    { label: "Germany", value: "DE" },
    { label: "Djibouti", value: "DJ" },
    { label: "Denmark", value: "DK" },
    { label: "Dominica", value: "DM" },
    { label: "Dominican Republic", value: "DO" },
    { label: "Algeria", value: "DZ" },
    { label: "Ecuador", value: "EC" },
    { label: "Estonia", value: "EE" },
    { label: "Egypt", value: "EG" },
    { label: "Western Sahara", value: "EH" },
    { label: "Eritrea", value: "ER" },
    { label: "Spain", value: "ES" },
    { label: "Ethiopia", value: "ET" },
    { label: "Finland", value: "FI" },
    { label: "Fiji", value: "FJ" },
    { label: "Falkland Islands", value: "FK" },
    { label: "Micronesia", value: "FM" },
    { label: "Faeroe Islands", value: "FO" },
    { label: "France", value: "FR" },
    { label: "Gabon", value: "GA" },
    { label: "United Kingdom", value: "GB" },
    { label: "Grenada", value: "GD" },
    { label: "Georgia", value: "GE" },
    { label: "French Guiana", value: "GF" },
    { label: "Ghana", value: "GH" },
    { label: "Gibraltar", value: "GI" },
    { label: "Greenland", value: "GL" },
    { label: "Gambia", value: "GM" },
    { label: "Guinea", value: "GN" },
    { label: "Guadaloupe", value: "GP" },
    { label: "Equatorial Guinea", value: "GQ" },
    { label: "Greece", value: "GR" },
    { label: "South Georgia and the South Sandwich Islands", value: "GS" },
    { label: "Guatemala", value: "GT" },
    { label: "Guam", value: "GU" },
    { label: "Guinea-Bissau", value: "GW" },
    { label: "Guyana", value: "GY" },
    { label: "Hong Kong", value: "HK" },
    { label: "Heard and McDonald Islands", value: "HM" },
    { label: "Honduras", value: "HN" },
    { label: "Croatia", value: "HR" },
    { label: "Haiti", value: "HT" },
    { label: "Hungary", value: "HU" },
    { label: "Indonesia", value: "ID" },
    { label: "Ireland", value: "IE" },
    { label: "Israel", value: "IL" },
    { label: "India", value: "IN" },
    { label: "British Indian Ocean Territory", value: "IO" },
    { label: "Iraq", value: "IQ" },
    { label: "Iran", value: "IR" },
    { label: "Iceland", value: "IS" },
    { label: "Italy", value: "IT" },
    { label: "Jamaica", value: "JM" },
    { label: "Jordan", value: "JO" },
    { label: "Japan", value: "JP" },
    { label: "Kenya", value: "KE" },
    { label: "Kyrgyz Republic", value: "KG" },
    { label: "Cambodia", value: "KH" },
    { label: "Kiribati", value: "KI" },
    { label: "Comoros", value: "KM" },
    { label: "St. Kitts and Nevis", value: "KN" },
    { label: "North Korea", value: "KP" },
    { label: "South Korea", value: "KR" },
    { label: "Kuwait", value: "KW" },
    { label: "Cayman Islands", value: "KY" },
    { label: "Kazakhstan", value: "KZ" },
    { label: "Lao People's Democratic Republic", value: "LA" },
    { label: "Lebanon", value: "LB" },
    { label: "St. Lucia", value: "LC" },
    { label: "Liechtenstein", value: "LI" },
    { label: "Sri Lanka", value: "LK" },
    { label: "Liberia", value: "LR" },
    { label: "Lesotho", value: "LS" },
    { label: "Lithuania", value: "LT" },
    { label: "Luxembourg", value: "LU" },
    { label: "Latvia", value: "LV" },
    { label: "Libyan Arab Jamahiriya", value: "LY" },
    { label: "Morocco", value: "MA" },
    { label: "Monaco", value: "MC" },
    { label: "Moldova", value: "MD" },
    { label: "Montenegro", value: "ME" },
    { label: "Madagascar", value: "MG" },
    { label: "Marshall Islands", value: "MH" },
    { label: "Macedonia", value: "MK" },
    { label: "Mali", value: "ML" },
    { label: "Myanmar", value: "MM" },
    { label: "Mongolia", value: "MN" },
    { label: "Macao", value: "MO" },
    { label: "Northern Mariana Islands", value: "MP" },
    { label: "Martinique", value: "MQ" },
    { label: "Mauritania", value: "MR" },
    { label: "Montserrat", value: "MS" },
    { label: "Malta", value: "MT" },
    { label: "Mauritius", value: "MU" },
    { label: "Maldives", value: "MV" },
    { label: "Malawi", value: "MW" },
    { label: "Mexico", value: "MX" },
    { label: "Malaysia", value: "MY" },
    { label: "Mozambique", value: "MZ" },
    { label: "Namibia", value: "NA" },
    { label: "New Caledonia", value: "NC" },
    { label: "Niger", value: "NE" },
    { label: "Norfolk Island", value: "NF" },
    { label: "Nigeria", value: "NG" },
    { label: "Nicaragua", value: "NI" },
    { label: "Netherlands", value: "NL" },
    { label: "Norway", value: "NO" },
    { label: "Nepal", value: "NP" },
    { label: "Nauru", value: "NR" },
    { label: "Niue", value: "NU" },
    { label: "New Zealand", value: "NZ" },
    { label: "Oman", value: "OM" },
    { label: "Panama", value: "PA" },
    { label: "Peru", value: "PE" },
    { label: "French Polynesia", value: "PF" },
    { label: "Papua New Guinea", value: "PG" },
    { label: "Philippines", value: "PH" },
    { label: "Pakistan", value: "PK" },
    { label: "Poland", value: "PL" },
    { label: "St. Pierre and Miquelon", value: "PM" },
    { label: "Pitcairn Island", value: "PN" },
    { label: "Puerto Rico", value: "PR" },
    { label: "Palestinian Territory", value: "PS" },
    { label: "Portugal", value: "PT" },
    { label: "Palau", value: "PW" },
    { label: "Paraguay", value: "PY" },
    { label: "Qatar", value: "QA" },
    { label: "Reunion", value: "RE" },
    { label: "Romania", value: "RO" },
    { label: "Serbia", value: "RS" },
    { label: "Russia", value: "RU" },
    { label: "Rwanda", value: "RW" },
    { label: "Saudi Arabia", value: "SA" },
    { label: "Solomon Islands", value: "SB" },
    { label: "Seychelles", value: "SC" },
    { label: "Sudan", value: "SD" },
    { label: "Sweden", value: "SE" },
    { label: "Singapore", value: "SG" },
    { label: "St. Helena", value: "SH" },
    { label: "Slovenia", value: "SI" },
    { label: "Svalbard & Jan Mayen Islands", value: "SJ" },
    { label: "Slovakia", value: "SK" },
    { label: "Sierra Leone", value: "SL" },
    { label: "San Marino", value: "SM" },
    { label: "Senegal", value: "SN" },
    { label: "Somalia", value: "SO" },
    { label: "Surilabel", value: "SR" },
    { label: "South Sudan", value: "SS" },
    { label: "Sao Tome and Principe", value: "ST" },
    { label: "Soviet Union", value: "SU" },
    { label: "El Salvador", value: "SV" },
    { label: "Syrian Arab Republic", value: "SY" },
    { label: "Swaziland", value: "SZ" },
    { label: "Turks and Caicos Islands", value: "TC" },
    { label: "Chad", value: "TD" },
    { label: "French Southern Territories", value: "TF" },
    { label: "Togo", value: "TG" },
    { label: "Thailand", value: "TH" },
    { label: "Tajikistan", value: "TJ" },
    { label: "Tokelau", value: "TK" },
    { label: "Timor-Leste", value: "TL" },
    { label: "Turkmenistan", value: "TM" },
    { label: "Tunisia", value: "TN" },
    { label: "Tonga", value: "TO" },
    { label: "Turkey", value: "TR" },
    { label: "Trinidad and Tobago", value: "TT" },
    { label: "Tuvalu", value: "TV" },
    { label: "Taiwan", value: "TW" },
    { label: "Tanzania", value: "TZ" },
    { label: "Ukraine", value: "UA" },
    { label: "Uganda", value: "UG" },
    { label: "United States Minor Outlying Islands", value: "UM" },
    { label: "United States of America", value: "US" },
    { label: "Uruguay", value: "UY" },
    { label: "Uzbekistan", value: "UZ" },
    { label: "Holy See", value: "VA" },
    { label: "St. Vincent and the Grenadines", value: "VC" },
    { label: "Venezuela", value: "VE" },
    { label: "British Virgin Islands", value: "VG" },
    { label: "US Virgin Islands", value: "VI" },
    { label: "Vietnam", value: "VN" },
    { label: "Vanuatu", value: "VU" },
    { label: "Wallis and Futuna Islands", value: "WF" },
    { label: "Samoa", value: "WS" },
    { label: "Czechoslovakia", value: "XC" },
    { label: "East Germany", value: "XG" },
    { label: "Kosovo", value: "XK" },
    { label: "Yemen", value: "YE" },
    { label: "Mayotte", value: "YT" },
    { label: "Yugoslavia", value: "YU" },
    { label: "South Africa", value: "ZA" },
    { label: "Zambia", value: "ZM" },
    { label: "Zimbabwe", value: "ZW" },
  ];

  const languageOptions = [
    { label: "Afar", value: "aa" },
    { label: "Afrikaans", value: "af" },
    { label: "Akan", value: "ak" },
    { label: "Aragonese", value: "an" },
    { label: "Assamese", value: "as" },
    { label: "Avaric", value: "av" },
    { label: "Avestan", value: "ae" },
    { label: "Aymara", value: "ay" },
    { label: "Azerbaijani", value: "az" },
    { label: "Bashkir", value: "ba" },
    { label: "Bambara", value: "bm" },
    { label: "Bislama", value: "bi" },
    { label: "Tibetan", value: "bo" },
    { label: "Breton", value: "br" },
    { label: "Catalan", value: "ca" },
    { label: "Czech", value: "cs" },
    { label: "Chechen", value: "ce" },
    { label: "Slavic", value: "cu" },
    { label: "Chuvash", value: "cv" },
    { label: "Cornish", value: "kw" },
    { label: "Corsican", value: "co" },
    { label: "Cree", value: "cr" },
    { label: "Welsh", value: "cy" },
    { label: "Danish", value: "da" },
    { label: "German", value: "de" },
    { label: "Divehi", value: "dv" },
    { label: "Dzongkha", value: "dz" },
    { label: "Esperanto", value: "eo" },
    { label: "Estonian", value: "et" },
    { label: "Basque", value: "eu" },
    { label: "Faroese", value: "fo" },
    { label: "Fijian", value: "fj" },
    { label: "Finnish", value: "fi" },
    { label: "French", value: "fr" },
    { label: "Frisian", value: "fy" },
    { label: "Fulah", value: "ff" },
    { label: "Gaelic", value: "gd" },
    { label: "Irish", value: "ga" },
    { label: "Galician", value: "gl" },
    { label: "Manx", value: "gv" },
    { label: "Guarani", value: "gn" },
    { label: "Gujarati", value: "gu" },
    { label: "Haitian, Haitian Creole", value: "ht" },
    { label: "Hausa", value: "ha" },
    { label: "Serbo-Croatian", value: "sh" },
    { label: "Herero", value: "hz" },
    { label: "Hiri Motu", value: "ho" },
    { label: "Croatian", value: "hr" },
    { label: "Hungarian", value: "hu" },
    { label: "Igbo", value: "ig" },
    { label: "Ido", value: "io" },
    { label: "Yi", value: "ii" },
    { label: "Inuktitut", value: "iu" },
    { label: "Interlingue", value: "ie" },
    { label: "Interlingua", value: "ia" },
    { label: "Indonesian", value: "id" },
    { label: "Inupiaq", value: "ik" },
    { label: "Icelandic", value: "is" },
    { label: "Italian", value: "it" },
    { label: "Javanese", value: "jv" },
    { label: "Japanese", value: "ja" },
    { label: "Kalaallisut", value: "kl" },
    { label: "Kannada", value: "kn" },
    { label: "Kashmiri", value: "ks" },
    { label: "Kanuri", value: "kr" },
    { label: "Kazakh", value: "kk" },
    { label: "Khmer", value: "km" },
    { label: "Kikuyu", value: "ki" },
    { label: "Kinyarwanda", value: "rw" },
    { label: "Kirghiz", value: "ky" },
    { label: "Komi", value: "kv" },
    { label: "Kongo", value: "kg" },
    { label: "Korean", value: "ko" },
    { label: "Kuanyama", value: "kj" },
    { label: "Kurdish", value: "ku" },
    { label: "Lao", value: "lo" },
    { label: "Latin", value: "la" },
    { label: "Latvian", value: "lv" },
    { label: "Limburgish", value: "li" },
    { label: "Lingala", value: "ln" },
    { label: "Lithuanian", value: "lt" },
    { label: "Letzeburgesch", value: "lb" },
    { label: "Luba-Katanga", value: "lu" },
    { label: "Ganda", value: "lg" },
    { label: "Marshall", value: "mh" },
    { label: "Malayalam", value: "ml" },
    { label: "Marathi", value: "mr" },
    { label: "Malagasy", value: "mg" },
    { label: "Maltese", value: "mt" },
    { label: "Moldavian", value: "mo" },
    { label: "Mongolian", value: "mn" },
    { label: "Maori", value: "mi" },
    { label: "Malay", value: "ms" },
    { label: "Burmese", value: "my" },
    { label: "Nauru", value: "na" },
    { label: "Navajo", value: "nv" },
    { label: "Ndebele", value: "nr" },
    { label: "Ndebele", value: "nd" },
    { label: "Ndonga", value: "ng" },
    { label: "Nepali", value: "ne" },
    { label: "Dutch", value: "nl" },
    { label: "Norwegian Nynorsk", value: "nn" },
    { label: "Norwegian Bokm\u00e5l", value: "nb" },
    { label: "Norwegian", value: "no" },
    { label: "Chichewa, Nyanja", value: "ny" },
    { label: "Occitan", value: "oc" },
    { label: "Ojibwa", value: "oj" },
    { label: "Oriya", value: "or" },
    { label: "Oromo", value: "om" },
    { label: "Ossetian, Ossetic", value: "os" },
    { label: "Pali", value: "pi" },
    { label: "Polish", value: "pl" },
    { label: "Portuguese", value: "pt" },
    { label: "Quechua", value: "qu" },
    { label: "Raeto-Romance", value: "rm" },
    { label: "Romanian", value: "ro" },
    { label: "Rundi", value: "rn" },
    { label: "Russian", value: "ru" },
    { label: "Sango", value: "sg" },
    { label: "Sanskrit", value: "sa" },
    { label: "Sinhalese", value: "si" },
    { label: "Slovak", value: "sk" },
    { label: "Slovenian", value: "sl" },
    { label: "Northern Sami", value: "se" },
    { label: "Samoan", value: "sm" },
    { label: "Shona", value: "sn" },
    { label: "Sindhi", value: "sd" },
    { label: "Somali", value: "so" },
    { label: "Sotho", value: "st" },
    { label: "Spanish", value: "es" },
    { label: "Albanian", value: "sq" },
    { label: "Sardinian", value: "sc" },
    { label: "Serbian", value: "sr" },
    { label: "Swati", value: "ss" },
    { label: "Sundanese", value: "su" },
    { label: "Swahili", value: "sw" },
    { label: "Swedish", value: "sv" },
    { label: "Tahitian", value: "ty" },
    { label: "Tamil", value: "ta" },
    { label: "Tatar", value: "tt" },
    { label: "Telugu", value: "te" },
    { label: "Tajik", value: "tg" },
    { label: "Tagalog", value: "tl" },
    { label: "Thai", value: "th" },
    { label: "Tigrinya", value: "ti" },
    { label: "Tonga", value: "to" },
    { label: "Tswana", value: "tn" },
    { label: "Tsonga", value: "ts" },
    { label: "Turkmen", value: "tk" },
    { label: "Turkish", value: "tr" },
    { label: "Twi", value: "tw" },
    { label: "Uighur", value: "ug" },
    { label: "Ukrainian", value: "uk" },
    { label: "Urdu", value: "ur" },
    { label: "Uzbek", value: "uz" },
    { label: "Venda", value: "ve" },
    { label: "Vietlabelse", value: "vi" },
    { label: "Volap\u00fck", value: "vo" },
    { label: "Walloon", value: "wa" },
    { label: "Wolof", value: "wo" },
    { label: "Xhosa", value: "xh" },
    { label: "Yiddish", value: "yi" },
    { label: "Zhuang", value: "za" },
    { label: "Zulu", value: "zu" },
    { label: "Abkhazian", value: "ab" },
    { label: "Mandarin", value: "zh" },
    { label: "Pushto", value: "ps" },
    { label: "Amharic", value: "am" },
    { label: "Arabic", value: "ar" },
    { label: "Bulgarian", value: "bg" },
    { label: "Cantonese", value: "cn" },
    { label: "Macedonian", value: "mk" },
    { label: "Greek", value: "el" },
    { label: "Persian", value: "fa" },
    { label: "Hebrew", value: "he" },
    { label: "Hindi", value: "hi" },
    { label: "Armenian", value: "hy" },
    { label: "English", value: "en" },
    { label: "Ewe", value: "ee" },
    { label: "Georgian", value: "ka" },
    { label: "Punjabi", value: "pa" },
    { label: "Bengali", value: "bn" },
    { label: "Bosnian", value: "bs" },
    { label: "Chamorro", value: "ch" },
    { label: "Belarusian", value: "be" },
    { label: "Yoruba", value: "yo" },
  ];

  const certificationOptions = [
    { value: "r", label: "R" },
    { value: "pg-13", label: "PG-13" },
    { value: "pg", label: "PG" },
    { value: "g", label: "G" },
    { value: "nc-17", label: "NC-17" },
  ];

  const getRange = (rangeState: Range, min: number, max: number) => {
    if (rangeState.max === max && rangeState.min === min) return;
    return `${rangeState.min},${rangeState.max}`;
  };

  const filtersUrlData = {
    order: sortValue,
    type: typeValue,
    genre: genreValue.join(),
    released: getRange(yearState, RELEASED_RANGE.min, RELEASED_RANGE.max),
    runtime: getRange(runtimeState, RUNTIME_RANGE.min, RUNTIME_RANGE.max),
    score: getRange(scoreState, SCORE_RANGE.min, SCORE_RANGE.max),
    country: countryValue,
    language: languageValue,
    certification: certificationValue,
  };

  const formatRuntime = (value: number) => `${value} min`;
  const formatScore = (value: number) => value.toFixed(1);

  const onClearBtnClick = () => {
    setSortValue(FILTERS_RESET.order);
    setTypeValue(FILTERS_RESET.type);
    setCountryValue(FILTERS_RESET.country);
    setLanguageValue(FILTERS_RESET.language);
    setCertificationValue(FILTERS_RESET.certification);
    setGenreValues(FILTERS_RESET.genre);
    setYearState(FILTERS_RESET.released);
    setRuntimeState(FILTERS_RESET.runtime);
    setScoreState(FILTERS_RESET.score);
  };

  const onShowBtnClick = () => {
    const filtersUrlParams = Object.entries(filtersUrlData)
      .filter((item) => item[1])
      .map((item) => item.join("="))
      .join("&");
    if (filtersUrlParams) {
      navigate(`/filters/${filtersUrlParams}&page=1`);
    } else {
      navigate(RoutesList.Home);
    }
    dispatch(setModalWindow(null));
  };

  useEffect(() => {
    setAnimState(true);
    return () => {
      setAnimState(false);
    };
  }, []);

  return (
    <ModalWindow
      windowTitle="Filters"
      windowClassName={classNames(styles.filtersWindow, {
        [styles.filtersShow]: animState,
      })}
      closeBtnClassName={styles.closeBtn}
    >
      <div className={styles.filtersContent}>
        <div className={styles.filtersItem}>
          <SelectComponent
            title="Sort by"
            placeholder="Popularity"
            optionsList={orderOptions}
            currentValues={sortValue}
            setSelecValue={setSortValue}
            isSearchable={false}
            isClearable
          />
        </div>
        <div className={styles.filtersItem}>
          <SelectComponent
            title="Type"
            placeholder="All Types"
            optionsList={typeOptions}
            currentValues={typeValue}
            setSelecValue={setTypeValue}
            isSearchable={false}
            isClearable
          />
          <SelectComponent
            title="Age rating"
            placeholder="All"
            optionsList={certificationOptions}
            currentValues={certificationValue}
            setSelecValue={setCertificationValue}
            isSearchable={false}
            isClearable
          />
        </div>

        <div className={styles.filtersItem}>
          <RangeComponent
            maxValue={SCORE_RANGE.max}
            minValue={SCORE_RANGE.min}
            step={0.1}
            title="Score"
            rangeState={scoreState}
            setNewRangeState={setScoreState}
            formatLabel={formatScore}
          />
        </div>
        <div className={styles.filtersItem}>
          <SelectComponent
            title="Country"
            placeholder="All Countries"
            optionsList={countryOptions}
            currentValues={countryValue}
            setSelecValue={setCountryValue}
            isSearchable
            isClearable
          />
          <SelectComponent
            title="Language"
            placeholder="All Languages"
            optionsList={languageOptions}
            currentValues={languageValue}
            setSelecValue={setLanguageValue}
            isSearchable
            isClearable
          />
        </div>

        <div className={styles.filtersItem}>
          <SelectComponent
            title="Genre"
            placeholder="All Genres"
            optionsList={genreOptions}
            currentValues={genreValue}
            isMulti
            setSelecValue={setGenreValues}
            isSearchable={false}
            isClearable
          />
        </div>
        <div className={styles.filtersItem}>
          <RangeComponent
            maxValue={RELEASED_RANGE.max}
            minValue={RELEASED_RANGE.min}
            step={1}
            title="Released In"
            rangeState={yearState}
            setNewRangeState={setYearState}
          />
        </div>
        <div className={styles.filtersItem}>
          <RangeComponent
            maxValue={RUNTIME_RANGE.max}
            minValue={RUNTIME_RANGE.min}
            step={1}
            title="Runtime"
            rangeState={runtimeState}
            setNewRangeState={setRuntimeState}
            formatLabel={formatRuntime}
          />
        </div>
      </div>
      <div className={styles.btnWrapper}>
        <Button
          title="Clear filter"
          onClick={onClearBtnClick}
          type={ButtonType.Secondary}
        />
        <Button
          title="Show results"
          onClick={onShowBtnClick}
          type={ButtonType.Primary}
        />
      </div>
    </ModalWindow>
  );
};

export default FilterWindow;
