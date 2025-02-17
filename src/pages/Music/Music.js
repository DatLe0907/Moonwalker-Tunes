import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import MusicPlayer from "./MusicPlayer";
import FindSong from "./FindSong"
import AlbumFilter from "./AlbumFilter";
import "./Music.css"

const songs = [
  { title: "Thriller", author: "Michael Jackson", album: "Thriller, HIStory", src: "https://www.youtube.com/embed/0JFbiCg-8n4?si=ICb4dAVdczaiP9dE?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Billie Jean", author: "Michael Jackson", album: "Thriller, HIStory", src: "https://www.youtube.com/embed/Zi_XLOBDo_Y?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Beat It", author: "Michael Jackson", album: "Thriller, HIStory", src: "https://www.youtube.com/embed/oRdxUFDoQe0?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Smooth Criminal", author: "Michael Jackson", album: "Bad", src: "https://www.youtube.com/embed/sFvENQBc-F8?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Black or White", author: "Michael Jackson", album: "Dangerous, HIStory", src: "https://www.youtube.com/embed/F2AitTPI5U0?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Man in the Mirror", author: "Michael Jackson", album: "Bad, HIStory", src: "https://www.youtube.com/embed/PivWY9wn5ps?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Earth Song", author: "Michael Jackson", album: "HIStory", src: "https://www.youtube.com/embed/XAi3VTSdTxU?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Heal the World", author: "Michael Jackson", album: "Dangerous, HIStory", src: "https://www.youtube.com/embed/BWf-eARnf6U?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "You Are Not Alone", author: "Michael Jackson", album: "HIStory", src: "https://www.youtube.com/embed/pAyKJAtDNCw?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Bad", author: "Michael Jackson", album: "Bad, HIStory", src: "https://www.youtube.com/embed/dsUXAEzaC3Q?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Rock with You", author: "Michael Jackson", album: "Off the Wall, HIStory", src: "https://www.youtube.com/embed/5X-Mrc2l1d0?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Don't Stop 'Til You Get Enough", author: "Michael Jackson", album: "Off the Wall, HIStory", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Remember the Time", author: "Michael Jackson", album: "Dangerous, HIStory", src: "https://www.youtube.com/embed/LeiFF0gvqcc?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "The Way You Make Me Feel", author: "Michael Jackson", album: "Bad, HIStory", src: "https://www.youtube.com/embed/HzZ_urpj4As?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "They Don't Care About Us", author: "Michael Jackson", album: "HIStory", src: "https://www.youtube.com/embed/QNJL6nfu__Q?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Blood on the Dance Floor", author: "Michael Jackson", album: "Blood on the Dance Floor", src: "https://www.youtube.com/embed/c3_NntYhzV4?si=6_Wef2t-PQ06Sh39?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Ghosts", author: "Michael Jackson", album: "Blood on the Dance Floor", src: "https://www.youtube.com/embed/Xh9Cp4rd7mI?si=bo1ddN5SBZFxQw3S?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Leave Me Alone", author: "Michael Jackson", album: "Bad", src: "https://www.youtube.com/embed/crbFmpezO4A?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Who Is It", author: "Michael Jackson", album: "Dangerous", src: "https://www.youtube.com/embed/PfrV_6yWbEg?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Stranger in Moscow", author: "Michael Jackson", album: "HIStory", src: "https://www.youtube.com/embed/pEEMi2j6lYE?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Another Part of Me", author: "Michael Jackson", album: "Bad", src: "ttps://www.youtube.com/embed/8vwHQNQ88cM?si=KOVgVafeZi5UBljr?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Scream", author: "Michael Jackson", album: "HIStory", src: "https://www.youtube.com/embed/0P4A1K4lXDo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Give In to Me", author: "Michael Jackson", album: "Dangerous", src: "https://www.youtube.com/embed/LJ7qXHjxj_0?si=M3F-KW9x0mhFVZeh?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Dirty Diana", author: "Michael Jackson", album: "Bad", src: "https://www.youtube.com/embed/yUi_S6YWjZw?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Will You Be There", author: "Michael Jackson", album: "Dangerous", src: "https://www.youtube.com/embed/jQY_QL_wvQU?si=D4b_QBPFYuUaVO5x?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Morphine", author: "Michael Jackson", album: "Blood on the Dance Floor", src: "https://www.youtube.com/embed/K_G5DLYRz6M?si=Z_nJrbHCh_SvGCh9?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Butterflies", author: "Michael Jackson", album: "Invincible", src: "https://www.youtube.com/embed/wthgd_Rg1qg?si=Zr-_0_1C8iC6ILxe?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Speechless", author: "Michael Jackson", album: "Invincible", src: "https://www.youtube.com/embed/csARzcsjark?si=8yipJ8XbuNWu2qKQ?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "You Rock My World", author: "Michael Jackson", album: "Invincible", src: "https://www.youtube.com/embed/g4tpuu-Up90?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Unbreakable", author: "Michael Jackson", album: "Invincible", src: "https://www.youtube.com/embed/WNQiROr5_AY?si=oMOdOiaMJGbkcwZW?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Break of Dawn", author: "Michael Jackson", album: "Invincible", src: "https://www.youtube.com/embed/O8ELJ_Eh8A0?si=RcYFOPMDjqXBmVvi?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Dangerous", author: "Michael Jackson", album: "Dangerous", src: "https://www.youtube.com/embed/7jTq2FXKr0g?si=jtKelPURTzEudLzM?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "In the Closet", author: "Michael Jackson", album: "Dangerous", src: "https://www.youtube.com/embed/4qLY0vbrT8Q?si=77XQnw7dp6qrnpTL?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Jam", author: "Michael Jackson", album: "Dangerous", src: "https://www.youtube.com/embed/JbHI1yI1Ndk?si=7zBZo0-EOj9oTIJd?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Why You Wanna Trip on Me", author: "Michael Jackson", album: "Dangerous", src: "https://www.youtube.com/embed/C2FUzoy-UCg?si=f1JKKFzUWTPYpOkB?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Gone Too Soon", author: "Michael Jackson", album: "Dangerous", src: "https://www.youtube.com/embed/IcNamirwTaY?si=zM0ln_G904M7WuhW?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "She Drives Me Wild", author: "Michael Jackson", album: "Dangerous", src: "https://www.youtube.com/embed/kRp_FqCmsVA?si=mhb5xPvEsuLGY5Mg?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "She's Out of My Life", author: "Michael Jackson", album: "Off the all, HIStory", src: "https://www.youtube.com/embed/6DQJPL9Yuq0?si=bapWHdfNp9ZoW11H?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Keep the Faith", author: "Michael Jackson", album: "Dangerous", src: "https://www.youtube.com/embed/vIEiP7kzGjI?si=t4UWO07AdvLK68kZ?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Someone Put Your Hand Out", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/jADX57wacsA?si=DXIpno-7rUtonSr6?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "For All Time", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/54703WkoChI?si=ZN5VTsEArzMiilS-?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Cheater", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/sGcWrDyHPWo?si=eyjHswxLQdUNIZkH?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "We've Had Enough", author: "Michael Jackson", album: "The Ultimate Collection", src: "https://www.youtube.com/embed/XzvwgDhwp3I?si=OxghcY-3Qc4K52Xe?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "One More Chance", author: "Michael Jackson", album: "Number Ones", src: "https://www.youtube.com/embed/-owpIWQMd80?si=GOJDMmpCN-CTZO39?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Monkey Business", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/LpL0gzU2giw?si=VJwyBqqPFx4P9L5Q?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "You Can't Win", author: "Michael Jackson", album: "The Wiz Soundtrack", src: "https://www.youtube.com/embed/Q9RtLGrdm68?si=lUJoLbnEvH50WSkB?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Ease on Down the Road", author: "Michael Jackson & Diana Ross", album: "The Wiz Soundtrack", src: "https://www.youtube.com/embed/uNKmKOjGUbw?si=G0r5gBK6aX5twDa1?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Carousel", author: "Michael Jackson", album: "Thriller", src: "https://www.youtube.com/embed/Hqsslwcb3Qg?si=s3XFWoaN39d3MwQ1?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Wanna Be Startin' Somethin'", author: "Michael Jackson", album: "Thriller, HIStory", src: "https://www.youtube.com/embed/DsJlttdkybk?si=y6RZty_7cGSAdFKu?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Girlfriend", author: "Michael Jackson", album: "Off the Wall", src: "https://www.youtube.com/embed/O8rc8FNCHcU?si=guFpcqibgYr7SgQC?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Get on the Floor", author: "Michael Jackson", album: "Off the Wall", src: "https://www.youtube.com/embed/UdYwglFL6iM?si=pMD3oFTZXrzYAOsT?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "I Can't Help It", author: "Michael Jackson", album: "Off the Wall", src: "https://www.youtube.com/embed/re3MOe1SBOs?si=0iOS8pvgb2VSDlhv?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Burn This Disco Out", author: "Michael Jackson", album: "Off the Wall", src: "https://www.youtube.com/embed/_F06umiWDDw?si=bwkArDywq1qacOv8?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Working Day and Night", author: "Michael Jackson", album: "Off the Wall", src: "https://www.youtube.com/embed/MWnyCxva6bA?si=meQmduQn9jEBDlms?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "She's Out of My Life", author: "Michael Jackson", album: "Off the Wall", src: "https://www.youtube.com/embed/6DQJPL9Yuq0?si=WWFaNh11kFpVfyAB?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "The Lady in My Life", author: "Michael Jackson", album: "Thriller", src: "https://www.youtube.com/embed/cJLH5yXoqi8?si=Buqf6d1ueqP4Jc_m?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Baby Be Mine", author: "Michael Jackson", album: "Thriller", src: "https://www.youtube.com/embed/O3tnOVideSo?si=7YLIstA-gjpBrIMd?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "The Girl Is Mine", author: "Michael Jackson", album: "Thriller, HIStory", src: "https://www.youtube.com/embed/O3tnOVideSo?si=7YLIstA-gjpBrIMd?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Human Nature", author: "Michael Jackson", album: "Thriller", src: "https://www.youtube.com/embed/ElN_4vUvTPs?si=ims4FRIibeOwukh_?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "P.Y.T. (Pretty Young Thing)", author: "Michael Jackson", album: "Thriller", src: "https://www.youtube.com/embed/8GB9BULxZ8c?si=Ie_h5ylXvgaElwlu?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Speed Demon", author: "Michael Jackson", album: "Bad", src: "https://www.youtube.com/embed/l039y9FaIjc?si=x5fAQF-Oyecta9G7?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Liberian Girl", author: "Michael Jackson", album: "Bad", src: "https://www.youtube.com/embed/f3V-7DEAgdc?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Just Good Friends", author: "Michael Jackson", album: "Bad", src: "https://www.youtube.com/embed/kt27N-_3Hjs?si=bYt0HXfQNezu2AlD?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "I Just Can't Stop Loving You", author: "Michael Jackson", album: "Bad, HIStory", src: "https://www.youtube.com/embed/GAmVuYEeSSg?si=WaBHqTaxxFc11ui7?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "This Time Around", author: "Michael Jackson", album: "HIStory", src: "hhttps://www.youtube.com/embed/uXFSjcjK73M?si=O36kz4VvZUluQXzT?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "History", author: "Michael Jackson", album: "HIStory", src: "https://www.youtube.com/embed/_ksnxNfrKrw?si=K3PsCvthoXdYRxGA?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Money", author: "Michael Jackson", album: "HIStory", src: "https://www.youtube.com/embed/I3XRCfet0Lc?si=ifmC3TzWxTI2868X?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "D.S.", author: "Michael Jackson", album: "HIStory", src: "https://www.youtube.com/embed/SHWpLfZzGU0?si=_p-8u48qWh0GvEt_?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Tabloid Junkie", author: "Michael Jackson", album: "HIStory", src: "https://www.youtube.com/embed/loCFx_eelXE?si=wazK1WXnRdmyBRCY?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "2 Bad", author: "Michael Jackson", album: "HIStory", src: "https://www.youtube.com/embed/U_ccH6-TnAE?si=gNHmJpR6QRJ1ta52?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Little Susie", author: "Michael Jackson", album: "HIStory", src: "https://www.youtube.com/embed/BVrNK870EzA?si=3JziDrfhaYBFPS3P?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Childhood", author: "Michael Jackson", album: "HIStory", src: "https://www.youtube.com/embed/puQEcN_iI9o?si=Aa2SXPdhQ2jLwkUK?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Threatened", author: "Michael Jackson", album: "Invincible", src: "ttps://www.youtube.com/embed/g8n5IrTU6mU?si=Qt8tDLRgLj2ioOgR?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "2000 Watts", author: "Michael Jackson", album: "Invincible", src: "https://www.youtube.com/embed/VA5hpF7PH1Q?si=_CjHOQ6_j9fWBapT?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Privacy", author: "Michael Jackson", album: "Invincible", src: "https://www.youtube.com/embed/IAX8rVcbUIQ?si=t4u2A7h_k62Kzp4a?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Don't Walk Away", author: "Michael Jackson", album: "Invincible", src: "https://www.youtube.com/embed/8OVAbsEhKQw?si=Zurd8MVZKM9YrWcV?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "The Lost Children", author: "Michael Jackson", album: "Invincible", src: "https://www.youtube.com/embed/1UoPNNzWUjk?si=Y-4rDlHAPrsSXY5A?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Heart Breaker", author: "Michael Jackson", album: "Invincible", src: "https://www.youtube.com/embed/CVd2A3F3UQw?si=J2MurRC3zCwIJGsl?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Heaven Can Wait", author: "Michael Jackson", album: "Invincible", src: "https://www.youtube.com/embed/TDVlDUAIz5k?si=SmKTs4gjnfRP6ikP?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Invincible", author: "Michael Jackson", album: "Invincible", src: "https://www.youtube.com/embed/kXzM0zmDEek?si=chtvUBYoeRPZ1EGN?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Cry", author: "Michael Jackson", album: "Invincible", src: "https://www.youtube.com/embed/mj3MfUR35CM?si=K8-HpIJhx6NmdyOZ?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Shout", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/O4o7rpbeTtY?si=3yXeTu-lREihDUSQ?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "We've Got a Good Thing Going", author: "Michael Jackson", album: "Ben", src: "https://www.youtube.com/embed/OTAfjaOWnH4?si=mV9fwXXM1nr3mCPr?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Ben", author: "Michael Jackson", album: "Ben", src: "https://www.youtube.com/embed/i7TTSzfs2kw?si=xvGqJ3ammHmLGEnE?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "The Greatest Show on Earth", author: "Michael Jackson", album: "Ben", src: "https://www.youtube.com/embed/p3oP7pJQEew?si=ekeZzfX_kX7oN68h?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "People Make the World Go Round", author: "Michael Jackson", album: "Ben", src: "https://www.youtube.com/embed/U4Ih_M_laCs?si=2eOEFcz0tTwkk_F-?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Everybody's Somebody's Fool", author: "Michael Jackson", album: "Ben", src: "https://www.youtube.com/embed/NhF60vvQiU8?si=W1M76QtW6J4C_u7e?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "My Girl", author: "Michael Jackson", album: "Ben", src: "https://www.youtube.com/embed/C3sjkfVNgPc?si=PqFUrm2Sq9TPozg6?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "What Goes Around Comes Around", author: "Michael Jackson", album: "Ben", src: "https://www.youtube.com/embed/ZU_xhdij6mA?si=Qb5rmB4hn03SWodf?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "In Our Small Way", author: "Michael Jackson", album: "Ben", src: "https://www.youtube.com/embed/ES0fQzoK5O0?si=IYmOX4TqPllVPd9Y?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Shoo-Be-Doo-Be-Doo-Da-Day", author: "Michael Jackson", album: "Ben", src: "https://www.youtube.com/embed/_I3H3BDKRUw?si=3vpsnbHo70in5bkW?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "You Can Cry on My Shoulder", author: "Michael Jackson", album: "Ben", src: "https://www.youtube.com/embed/RIaxbd2_jiA?si=4QHtslEQbuQxJ6vp?rel=0&controls=0&modestbranding=1&showinfo=0" }, 
  { title: "Music and Me", author: "Michael Jackson", album: "Music & Me", src: "https://www.youtube.com/embed/IO9xvk8Bojo?si=Mk3GHj7SY1dP8UXS?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "With A Child's Heart", author: "Michael Jackson", album: "Music & Me", src: "https://www.youtube.com/embed/ZyPER1Rd39w?si=f0DijifEfna1gYti?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Up Again", author: "Michael Jackson", album: "Music & Me", src: "https://www.youtube.com/embed/414dWsr0qg8?si=flk4PHId4Io_V2tz?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "All The Things You Are", author: "Michael Jackson", album: "Music & Me", src: "https://www.youtube.com/embed/qdZ58AUs4Fc?si=rNfs2IDobmeRHtuJ?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Happy", author: "Michael Jackson", album: "Music & Me", src: "https://www.youtube.com/embed/gqag3AcEIuo?si=Gbw-d24DnDlN_idx?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Too Young", author: "Michael Jackson", album: "Music & Me", src: "https://www.youtube.com/embed/DqOJ3Cyxh8g?si=BF6xS1dHfQ8BYB79?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Doggin' Around", author: "Michael Jackson", album: "Music & Me", src: "https://www.youtube.com/embed/OH7qIr7yl-8?si=mBtUoaZNSh7qfs7e?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Johnny Raven", author: "Michael Jackson", album: "Music & Me", src: "https://www.youtube.com/embed/4ieeG87E7ug?si=j0Md3eDm0pCm_hon?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Euphoria", author: "Michael Jackson", album: "Music & Me", src: "https://www.youtube.com/embed/WNNbk5q1R0o?si=a6IOpnGT1aLkkEyc?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Morning Glow", author: "Michael Jackson", album: "Music & Me", src: "https://www.youtube.com/embed/JEHxTK4XgK4?si=aLshdYbkPY8q2LXs?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Farewell My Summer Love", author: "Michael Jackson", album: "Farewell My Summer Love", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "One Day in Your Life", author: "Michael Jackson", album: "Forever, Michael", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Cinderella Stay Awhile", author: "Michael Jackson", album: "Forever, Michael", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "We're Almost There", author: "Michael Jackson", album: "Forever, Michael", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "You Are My Life", author: "Michael Jackson", album: "Invincible", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Someone in the Dark", author: "Michael Jackson", album: "E.T. The Extra-Terrestrial", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Blue Gangsta", author: "Michael Jackson", album: "Xscape", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "A Place with No Name", author: "Michael Jackson", album: "Xscape", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Slave to the Rhythm", author: "Michael Jackson", album: "Xscape", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Love Never Felt So Good", author: "Michael Jackson", album: "Xscape", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Chicago", author: "Michael Jackson", album: "Xscape", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Do You Know Where Your Children Are", author: "Michael Jackson", album: "Xscape", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Loving You", author: "Michael Jackson", album: "Xscape", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Xscape", author: "Michael Jackson", album: "Xscape", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Sunset Driver", author: "Michael Jackson", album: "The Ultimate Collection", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "I'm So Blue", author: "Michael Jackson", album: "Bad 25", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Al Capone", author: "Michael Jackson", album: "Bad 25", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "If You Don't Love Me", author: "Michael Jackson", album: "The Ultimate Collection", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Serious Effect", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Trouble", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/yURRmWtbTbo?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Scared of the Moon", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/7PPztOb4A3c?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "What More Can I Give", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/oU8-QE5b24E?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Seeing Voices", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/ZgDEqkHpcUw?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Xscape (Original Version)", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/JLKmNo8EJGM?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Hot Street", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/hhRSj4swuZs?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "She Got It", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/GSTgbzVGRMs?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Ekam Satyam", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/GQLtAC4PIQk?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "I Am a Loser", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/XEGzORcWjMI?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Do You Love Me", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/VXH3yYoxPqA?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Buffalo Bill", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/xh7ry5IY6cM?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "People of the World", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/q6TeFIVz2Nw?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Can’t Get Your Weight Off of Me", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/JkG3OB5-gAQ?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "I Was the Loser", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/LJSqBae2pTk?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Why", author: "Michael Jackson & 3T", album: "Brotherhood", src: "https://www.youtube.com/embed/NAi6pZ3GbV0?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "We Are Here to Change the World", author: "Michael Jackson", album: "Captain EO Soundtrack", src: "https://www.youtube.com/embed/W2s8Nxe8tHk?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Mind Is the Magic", author: "Michael Jackson", album: "Siegfried & Roy Soundtrack", src: "https://www.youtube.com/embed/1E9vYwzz0_M?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "On the Line", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/Wdgu6u18MfM?si=hLyVkx09zs2VPtOa?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "We Be Ballin'", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/FgJJom7fm_I?si=NacdBLp_ji7BjxTX?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Shout", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/O4o7rpbeTtY?si=E-UKjqCh7vj0c4Dz?rel=0&controls=0&modestbranding=1&showinfo=0" },
  { title: "Ride With Me", author: "Michael Jackson", album: "Unreleased", src: "https://www.youtube.com/embed/7Sm8eSyM2Ik?si=u4cEzQT1jsuz215n?rel=0&controls=0&modestbranding=1&showinfo=0" },
];

// const songs = [
//   { title: "Thriller", author: "Michael Jackson", album: "Thriller, HIStory", src: "https://www.youtube.com/embed/0JFbiCg-8n4?si=ICb4dAVdczaiP9dE?rel=0&controls=0&modestbranding=1&showinfo=0" },
//   { title: "Billie Jean", author: "Michael Jackson", album: "Thriller, HIStory", src: "https://www.youtube.com/embed/Zi_XLOBDo_Y?rel=0&controls=0&modestbranding=1&showinfo=0" },
//   { title: "Beat It", author: "Michael Jackson", album: "Thriller, HIStory", src: "https://www.youtube.com/embed/oRdxUFDoQe0?rel=0&controls=0&modestbranding=1&showinfo=0" },
// ]
const songsPerPage = 8;

function Music() {
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState("All");
  const [highlightedSong, setHighlightedSong] = useState(null);
  const songRefs = useRef({}); // 🔥 Dùng object để lưu refs theo title

  const navigate = useNavigate();
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  useEffect(() => {
    const savedAlbum = params.get("album") || "All";
    const savedPage = parseInt(params.get("page"), 10) || 1;
    setSelectedAlbum(savedAlbum);
    setCurrentPage(savedPage);
  }, [params]);

  // ✅ Lọc bài hát theo album ngay từ đầu
  useEffect(() => {
    let sortedSongs = [...songs];

    if (selectedAlbum !== "All") {
      sortedSongs = sortedSongs.filter(song =>
        song.album
          .split(",")
          .map(a => a.trim())
          .includes(selectedAlbum)
      );
    }
    
    setFilteredSongs(sortedSongs); // 🔥 Cập nhật danh sách bài hát
  }, [selectedAlbum, songs]);

  // Lấy danh sách bài hát theo trang
  const currentSongs = useMemo(() => {
    const start = (currentPage - 1) * songsPerPage;
    return filteredSongs.slice(start, start + songsPerPage);
  }, [filteredSongs, currentPage]);

  useEffect(() => {
    const newParams = new URLSearchParams();
    newParams.set("album", selectedAlbum);
    newParams.set("page", currentPage);
    navigate(`?${newParams.toString()}`, { replace: true });
  }, [currentPage, selectedAlbum, navigate]);

  

  const totalPages = Math.ceil(filteredSongs.length / songsPerPage);

  const handlePlay = (index) => {
    setCurrentPlaying(index);
  };

  const handleNextSong = () => {
    const nextIndex = currentPlaying + 1;
    if (nextIndex < currentSongs.length) {
      setCurrentPlaying(nextIndex);
    } else if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setCurrentPlaying(0);
    } else {
      setCurrentPage(1);
      setCurrentPlaying(0);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
    setCurrentPlaying(null);
  };

  // 🔥 Scroll đến bài hát
  const scrollToSong = (title) => {
    const songElement = songRefs.current[title];
    if (songElement) {
      songElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // ✅ Tìm kiếm bài hát chính xác hơn
  const handleSearch = (query) => {
    setCurrentPlaying(null);
  
    // 🔍 Tìm bài hát trong toàn bộ danh sách
    const foundSongIndex = songs.findIndex((song) =>
      song.title.toLowerCase().includes(query.toLowerCase())
    );
  
    if (foundSongIndex !== -1) {
      // 📌 Xác định trang chứa bài hát
      const newPage = Math.floor(foundSongIndex / songsPerPage) + 1;
  
      // 🔄 Đặt album về "All" để đảm bảo bài hát hiển thị
      setSelectedAlbum("All");
      setCurrentPage(newPage);
  
      // 🌍 Cập nhật URL
      const newParams = new URLSearchParams();
      newParams.set("album", "All");
      newParams.set("page", newPage);
      navigate(`?${newParams.toString()}`, { replace: true });
  
      // 🔥 Đợi danh sách cập nhật xong rồi cuộn đến bài hát
      setTimeout(() => {
        scrollToSong(songs[foundSongIndex].title);
        setHighlightedSong(songs[foundSongIndex].title);
  
        // ✨ Hiệu ứng lắc bài hát
        setTimeout(() => {
          setHighlightedSong(null);
        }, 800);
      }, 500);
    }
  };
  
  

  return (
    <div className="Music">
      <h1 className="Music-heading">Michael Jackson’s Top Songs</h1>

      <div className="Music-control">
        <FindSong 
          songs={songs} 
          onSearch={handleSearch} 
          scrollToSong={scrollToSong} 
          setSelectedAlbum={setSelectedAlbum} // ✅ Cho phép FindSong cập nhật album
          setCurrentPage={setCurrentPage} // ✅ Reset về trang 1
          navigate={navigate} // ✅ Truyền navigate để cập nhật URL
        />


        <AlbumFilter
          songs={songs}
          selectedAlbum={selectedAlbum}
          setSelectedAlbum={setSelectedAlbum}
          onFilter={setFilteredSongs}
          setCurrentPage={setCurrentPage} // ✅ Truyền setCurrentPage
        />
      </div>

      <div className="Music-box">
        {currentSongs.length > 0 ? (
          currentSongs.map((song, index) => {
            const globalIndex = (currentPage - 1) * songsPerPage + index;
            return (
                <MusicPlayer
                  key={song.title} 
                  ref={(el) => (songRefs.current[song.title] = el)}
                  song={song}
                  isPlaying={currentPlaying === index}
                  onPlay={() => handlePlay(index)}
                  onEnd={handleNextSong}
                  isHighlighted={highlightedSong === globalIndex}
                />
            );
          })
        ) : (
          <p className="Music-no-results">No songs found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <ReactPaginate
          previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
          nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          forcePage={currentPage - 1}
          containerClassName={"Music-pagination"}
          activeClassName={"active"}
          previousClassName={"prev"}
          nextClassName={"next"}
          disabledClassName={"disabled"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
        />
      )}
    </div>
  );
}

export default Music;

