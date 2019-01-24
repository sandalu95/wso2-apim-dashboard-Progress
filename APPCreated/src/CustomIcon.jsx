import React from 'react';
import PropTypes from 'prop-types';

/**
 * render the Custom Icon
 * @param {object} props - strokeColor, width, height, style
 * @return {ReactElement} iconBody
 * */
export default function CustomIcon(props) {
    let {
        strokeColor, width, height, style,
    } = props;
    strokeColor = strokeColor !== undefined ? strokeColor : '#8b8e95';
    width = width !== undefined ? width : 32;
    height = height !== undefined ? height : 32;
    style = style !== undefined ? style : '';

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            viewBox='0 0 8.4505663 8.3507221'
            id='svg8'
            style={style}
        >
            <g
                id='layer2'
                transform='translate(123.263 -67.386)'
            >
                <g
                    id='g5908'
                    transform='matrix(1.00352 0 0 .99166 -122.928 40.99)'
                    fill={strokeColor}
                >
                    <circle
                        r='3.946'
                        cy='30.828'
                        cx='3.877'
                        id='circle5894'
                        fill='none'
                        stroke={strokeColor}
                        strokeWidth='0.529'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                    <g
                        transform='matrix(.70376 0 0 .70376 -3.385 9.22)'
                        id='g5902'
                        strokeWidth='0.529'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    >
                        <path
                            id='path5896'
                            d='M 4.7613342,33.375515 C 4.8631294,33.213704 4.9670191,33.05335 5.0722839,32.893801 5.1386022,32.78256 5.206498,32.671647 5.2840974,32.56775 c 0.046965,-0.06795 0.094122,-0.136253 0.1377834,-0.206412 0.053525,-0.08978 0.087344,-0.188415 0.1309729,-0.282686 0.049209,-0.08677 0.087411,-0.175554 0.1418453,-0.259125 0.038288,-0.082 0.080276,-0.162084 0.1283769,-0.238803 0.066997,-0.0819 0.1429599,-0.15477 0.2044165,-0.241358 0.080426,-0.07808 0.1281639,-0.180477 0.1972413,-0.266009 0.063695,-0.05662 0.072795,-0.137237 0.100606,-0.212228 0.041434,-0.0658 0.05889,-0.140472 0.086826,-0.211693 0.051833,-0.06909 0.063968,-0.154456 0.1048719,-0.228026 0.040122,-0.06828 0.080049,-0.136649 0.11949,-0.205428 0.029448,-0.08488 0.075636,-0.161821 0.1086824,-0.245242 0.011192,-0.08303 0.067464,-0.133776 0.1103789,-0.199088 0.032786,-0.07541 0.07196,-0.14477 0.092765,-0.224954 0.012501,-0.07873 0.079614,-0.127881 0.1025321,-0.20342 0.029945,-0.06213 0.061462,-0.123261 0.09096,-0.185904 0.024508,-0.07918 0.078013,-0.138464 0.098885,-0.219729 0.034286,-0.08109 0.067554,-0.162597 0.1169305,-0.235756 0.042013,-0.08273 0.087005,-0.164219 0.1324602,-0.245597 0.02028,-0.08863 0.061221,-0.161753 0.1139984,-0.234551 0.024455,-0.04246 0.023831,-0.09634 0.023447,-0.144253 0.017671,-0.05197 0.051315,-0.09226 0.074691,-0.142539 0.012774,-0.06633 0.050109,-0.123804 0.07442,-0.18641 0.021384,-0.05539 0.03159,-0.112257 0.034506,-0.171288 -0.00148,-0.05331 0.020579,-0.102108 0.05846,-0.138798 0.027456,-0.04587 0.02797,-0.09933 0.0466,-0.147876 0.03144,-0.06336 0.07198,-0.108405 0.130524,-0.146806 0.03787,-0.05381 0.1015656,-0.07433 0.1381413,-0.128739 0.014124,-0.0475 0.00842,-0.101131 0.00565,-0.150286 0,0 0.6520503,-0.0028 0.6520503,-0.0028 v 0 c 0.00175,0.06224 0.00717,0.125208 -0.00604,0.186708 -0.032643,0.06536 -0.072739,0.105857 -0.1398024,0.134168 -0.040293,0.08802 -0.1033822,0.04113 -0.1292135,0.146264 -0.029212,0.0087 -0.024029,0.118147 -0.046758,0.148227 -0.020328,0.03962 -0.064491,0.0515 -0.057182,0.104778 -0.00642,0.06382 -0.00975,0.12746 -0.037203,0.186812 -0.019886,0.0717 -0.065789,0.124431 -0.071968,0.197628 -0.023556,0.03923 -0.025405,0.100711 -0.07474,0.111283 -0.00119,0.06261 -0.00259,0.125916 -0.024826,0.185481 -0.054673,0.07202 -0.1056624,0.130747 -0.1146701,0.226661 -0.048,0.08249 -0.09728,0.162282 -0.1332887,0.249378 -0.043781,0.0697 -0.08186,0.138652 -0.1156239,0.214963 -0.00864,0.03228 -0.013256,0.06589 -0.025728,0.0969 -0.013534,0.03364 -0.054565,0.06098 -0.065743,0.09292 -0.00487,0.01389 -0.00393,0.02919 -0.00589,0.04378 -0.031382,0.0577 -0.049296,0.120462 -0.09279,0.170043 -0.00909,0.04981 -0.028578,0.111027 -0.066676,0.148291 -0.00731,0.0071 -0.021926,0.0048 -0.027626,0.01334 -0.00789,0.01175 -0.00612,0.02765 -0.00918,0.04147 -0.017571,0.08895 -0.058932,0.162595 -0.091392,0.244393 -0.037048,0.0726 -0.1039921,0.101328 -0.1111927,0.190651 -0.036358,0.08496 -0.078514,0.163587 -0.1088776,0.250698 -0.034831,0.07483 -0.087342,0.14037 -0.1205632,0.216673 -0.061595,0.05065 -0.035616,0.159104 -0.103472,0.21377 -0.036118,0.06573 -0.03606,0.148918 -0.086634,0.209423 -0.037399,0.07874 -0.037097,0.173347 -0.1032523,0.239212 -0.086288,0.05613 -0.1007163,0.194321 -0.1976435,0.249661 -0.052372,0.09375 -0.1280837,0.167971 -0.2028502,0.244875 -0.055168,0.06905 -0.089512,0.154617 -0.1285743,0.233727 -0.0091,0.0168 -0.018203,0.03358 -0.027306,0.05038 -0.010681,0.0098 -0.024593,0.01693 -0.032047,0.02937 -0.031954,0.05328 -0.033363,0.129217 -0.082572,0.174985 -0.050238,0.09091 -0.074362,0.19571 -0.1296654,0.284895 -0.037724,0.0776 -0.097396,0.143473 -0.1407623,0.218334 -0.086158,0.09495 -0.1428337,0.212937 -0.2133743,0.319106 -0.1035939,0.159317 -0.213396,0.31464 -0.3088825,0.479272 0,0 -0.6472568,-0.03501 -0.6472568,-0.03501 z'
                        />
                        <path
                            id='path5898'
                            d='m 8.9406345,27.068147 c 0.03928,0.271561 0.1142992,0.530887 0.2147708,0.785186 0.086483,0.205163 0.1890273,0.401238 0.2603582,0.613516 0.070461,0.218844 0.165,0.427786 0.2477624,0.642119 0.079807,0.194493 0.1480569,0.396275 0.2589356,0.575734 0.076306,0.128944 0.1479585,0.260183 0.2206245,0.391689 0.06479,0.111477 0.143088,0.217355 0.228409,0.31382 0.06375,0.121904 0.141677,0.232738 0.221708,0.343513 0.08297,0.112538 0.148314,0.236686 0.228788,0.350661 0.06197,0.09098 0.08371,0.204687 0.138563,0.298767 0.02459,0.04217 0.05788,0.07879 0.08307,0.120603 0.09339,0.104277 0.162343,0.223009 0.243071,0.336523 0.03683,0.107622 0.113293,0.187598 0.18476,0.273661 0.07603,0.06777 0.116486,0.16972 0.205363,0.22057 0.0099,0.05748 0.07913,0.06809 0.108122,0.102592 0.03135,0.03731 0.03593,0.06919 0.07422,0.10272 0.06019,0.05314 0.104443,0.121745 0.165394,0.173307 0.05538,0.006 0.06625,0.05262 0.100695,0.08493 0.02945,0.02762 0.06865,0.03055 0.09965,0.06016 0.03142,0.104217 0.07447,0.05341 0.114292,0.105209 0.02913,0.05601 0.06914,0.108601 0.13026,0.136141 0.0325,0.08727 0.144098,0.0773 0.186097,0.14378 0,0 -0.650204,0.05069 -0.650204,0.05069 v 0 c -0.07407,-0.02577 -0.12331,-0.08137 -0.1836,-0.128254 -0.05203,-0.04043 -0.08648,-0.09588 -0.132182,-0.142603 -0.05742,-0.0092 -0.07409,-0.06998 -0.11301,-0.105838 -0.0733,-0.04353 -0.130195,-0.105199 -0.200836,-0.152535 -0.05352,-0.05979 -0.110175,-0.116996 -0.166022,-0.174535 -0.05791,-0.0676 -0.111836,-0.136816 -0.179897,-0.195514 -0.07705,-0.07087 -0.133901,-0.1607 -0.206752,-0.236056 -0.07115,-0.08704 -0.13967,-0.175305 -0.184253,-0.279731 -0.07559,-0.116591 -0.156646,-0.228947 -0.241041,-0.339185 -0.0862,-0.133636 -0.14698,-0.276585 -0.221396,-0.416822 C 10.100126,31.00656 10.027374,30.88799 9.9462258,30.774777 9.8650119,30.66615 9.798756,30.549119 9.7251664,30.435309 9.6425603,30.331201 9.556529,30.227995 9.4960391,30.108916 9.424744,29.97831 9.3521796,29.84859 9.2784921,29.719457 9.17104,29.53435 9.1019039,29.330065 9.0209152,29.132479 8.9390618,28.916934 8.8418947,28.707828 8.7716729,28.487875 8.6999415,28.27746 8.5951681,28.083216 8.5139688,27.877201 8.413852,27.617256 8.3449392,27.351371 8.2939018,27.077326 c 0,0 0.6467327,-0.0092 0.6467327,-0.0092 z'
                        />
                        <path
                            id='path5900'
                            d='m 6.0945796,31.324089 c 0.162945,-0.0873 0.3167404,-0.191071 0.4814803,-0.274971 0.086928,-0.06072 0.180439,-0.109873 0.271567,-0.163562 0.071097,-0.01685 0.1371349,-0.04314 0.1975789,-0.08479 0.067101,-0.02778 0.1125578,-0.08835 0.1827927,-0.108316 0.070079,-0.03781 0.1348865,-0.08351 0.1986968,-0.131058 0.050026,-0.04346 0.1099759,-0.06732 0.1687888,-0.0958 0.056322,-0.04479 0.1123673,-0.09074 0.167649,-0.137189 0.062041,-0.05378 0.1304343,-0.1011 0.2009119,-0.143266 0.076139,-0.05258 0.1548376,-0.100124 0.2370079,-0.142679 0.059735,-0.0285 0.1183823,-0.05858 0.1791854,-0.08524 0.067183,-0.03379 0.1317321,-0.07035 0.2059003,-0.09107 0.075807,-0.0091 0.144103,-0.03785 0.2143221,-0.06582 0.067399,-0.0182 0.1190852,-0.05515 0.1763429,-0.09197 0.052224,-0.02864 0.084841,-0.08315 0.1391303,-0.109643 0.023897,-0.04096 0.048641,-0.08841 0.096125,-0.105707 0.05263,-0.01442 0.0918,-0.05441 0.1394135,-0.08159 0.050501,-0.0099 0.084504,-0.04599 0.1271323,-0.07109 0.03788,-0.03183 0.078521,-0.0605 0.1094552,-0.09932 0.033503,-0.04383 0.071352,-0.0394 0.1038249,-0.08697 0.047919,-0.02903 0.09508,-0.0498 0.1405011,-0.08368 0.036571,-0.03275 0.084568,-0.04318 0.1265097,-0.06534 0.028147,-0.0403 0.077267,-0.05122 0.1116494,-0.08328 0.04514,-0.01775 0.09483,-0.0071 0.13997,-0.0223 0.03576,-0.02302 0.01801,-0.01222 0.05317,-0.03249 0,0 0.648075,0.07005 0.648075,0.07005 v 0 c -0.03466,0.01736 -0.01719,0.0085 -0.05241,0.0265 -0.0443,0.04256 -0.08103,0.0525 -0.141238,0.04325 -0.02607,-0.0141 -0.07764,0.03788 -0.108526,0.0449 -0.03409,0.05733 -0.08075,0.05181 -0.129516,0.08694 -0.05165,0.02024 -0.07574,0.07847 -0.138057,0.07179 -0.04044,0.0068 -0.0449,0.122219 -0.101165,0.06317 -0.02491,0.05589 -0.07114,0.08535 -0.112654,0.126471 -0.03778,0.03516 -0.08478,0.06694 -0.1303142,0.09129 -0.060019,0.0073 -0.089149,0.0579 -0.1367521,0.07508 -0.038158,0.02209 -0.086344,0.01545 -0.094571,0.07519 -0.029606,0.05841 -0.1141365,0.07207 -0.142957,0.140753 -0.068018,0.01823 -0.1000321,0.08896 -0.1760328,0.09199 -0.068599,0.03575 -0.1412267,0.06901 -0.2172153,0.08049 -0.07429,0.0097 -0.1531146,0.02669 -0.2034182,0.08653 -0.065558,0.0081 -0.1288876,0.04234 -0.1809867,0.08242 -0.086451,0.01106 -0.1594593,0.08306 -0.2337361,0.12556 -0.064336,0.04627 -0.1354915,0.08366 -0.2001358,0.130652 -0.051199,0.05747 -0.1203698,0.08991 -0.1679459,0.15127 -0.05536,0.04234 -0.122174,0.05093 -0.1696635,0.0958 -0.070371,0.0358 -0.1213287,0.102404 -0.1975231,0.127042 -0.034028,0.03742 -0.051916,0.01484 -0.088635,0.04191 -0.032556,0.024 -0.050493,0.06271 -0.094409,0.07137 -0.064781,0.03469 -0.1235374,0.09695 -0.2003015,0.0954 -0.08813,0.01826 0.015163,-0.0096 -0.077898,0.04203 -0.065611,0.03641 -0.1436725,0.05742 -0.1968458,0.117269 -0.1685594,0.07326 -0.3178233,0.182411 -0.4795059,0.268705 0,0 -0.6447653,-0.06667 -0.6447653,-0.06667 z'
                        />
                    </g>
                    <g
                        id='text5906'
                        fontWeight='400'
                        fontSize='2.238'
                        fontFamily='Silom'
                        letterSpacing='0'
                        wordSpacing='0'
                        strokeWidth='0.153'
                    >
                        <path
                            d='m 4.7714347,30.569627 h 0.3737781 v 0.18577 q 0,-0.094 0.047002,-0.138768 0.047002,-0.047 0.1387679,-0.047 h 0.1880081 q 0.1521971,0 0.2618685,0.109671 0.1096714,0.109671 0.1096714,0.261869 v 0.559548 q 0,0.154435 -0.1096714,0.264106 -0.1096714,0.109672 -0.2618685,0.109672 h -0.373778 v 0.373778 H 4.7714347 Z m 0.3737781,1.119096 h 0.1857699 q 0.078337,0 0.1320533,-0.05372 0.055955,-0.05596 0.055955,-0.134291 v -0.559548 q 0,-0.0761 -0.055955,-0.129816 -0.053717,-0.05595 -0.1320533,-0.05595 -0.076098,0 -0.1320533,0.05595 -0.053717,0.05372 -0.053717,0.129816 z'
                            id='path13779'
                        />
                        <path
                            d='m 6.266477,30.569627 h 0.3737781 v 0.18577 q 0,-0.094 0.047002,-0.138768 0.047002,-0.047 0.1387679,-0.047 h 0.1880082 q 0.152197,0 0.2618684,0.109671 0.1096715,0.109671 0.1096715,0.261869 v 0.559548 q 0,0.154435 -0.1096715,0.264106 -0.1096714,0.109672 -0.2618684,0.109672 H 6.6402551 v 0.373778 H 6.266477 Z m 0.3737781,1.119096 H 6.826025 q 0.078337,0 0.1320534,-0.05372 0.055955,-0.05596 0.055955,-0.134291 v -0.559548 q 0,-0.0761 -0.055955,-0.129816 -0.053717,-0.05595 -0.1320534,-0.05595 -0.076098,0 -0.1320533,0.05595 -0.053717,0.05372 -0.053717,0.129816 z'
                            id='path13781'
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
}

CustomIcon.propTypes = {
    strokeColor: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    style: PropTypes.shape({}).isRequired,
};
