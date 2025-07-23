import jwt from 'jsonwebtoken';
import User from '../../../models/userSchema.js';
import path from 'path';
import ImageUpload from '../../../models/images/imageUploadSchema.js';

// export const thumbnail = async (req, res) => {
//     if(!req.file){
//         return res.status(400).json({
//             message : "No file uploaded."
//         })
//     }
    
//     // 1. 토큰이 있는지 없는지 검사한다. 나중에
//     // const token = req.headers.authorization?.split(' ')[1];
//     // if(!token){
//     //     return res.status(401).json({
//     //         message : "Authorization token is missing"
//     //     })
//     // }

//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     // 2. 요청을 받아서 이미지를 업데이트 시켜준다.
//     const currentUserEmail = decoded.email;
//     const picturePath = req.file.destination;
//     const pictureName = req.file.filename;

//     const foundUser = await User.findOne({ email : currentUserEmail }).lean();

//     await User.updateOne(
//         foundUser,
//         {
//             picture : pictureName,
//             picturePath : picturePath
//         }
//     )

//     res.status(200).json({
//         message : '파일이 성공적으로 업데이트 되었습니다.😁',
//         picturePath : picturePath,
//         pictureName : pictureName
//     })

// }

// export const thumbnail = async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({
//             message: "No file uploaded.",
//         });
//     }
//     console.log("요청확인!!!!!!!!")
//     // 👇 토큰 없이 저장 가능하도록 수정
//     const token = req.headers.authorization?.split(" ")[1];
//     let currentUserEmail = null;

//     if (token) {
//         try {
//             const decoded = jwt.verify(token, process.env.SECRET_KEY);
//             currentUserEmail = decoded.email;
//         } catch (err) {
//             console.warn("토큰 검증 실패. 사용자 정보 없음.");
//         }
//     }

//     const picturePath = req.file.destination;
//     const pictureName = req.file.filename;

//     // 👇 토큰이 있을 경우에만 DB 업데이트 시도
//     if (currentUserEmail) {

//         console.log("파일 저장 위치:", req.file.destination);
//         console.log("파일 이름:", req.file.filename);
//         console.log("사용자 이메일:", currentUserEmail);
//         const foundUser = await User.findOne({ email: currentUserEmail }).lean();
//         console.log("찾은 유저:", foundUser);
//         if (foundUser) {
//             await User.updateOne(
//                 { email: currentUserEmail },
//                 {
//                     picture: pictureName,
//                     picturePath: picturePath,
//                 }
//             );
//         }
//     }

//     res.status(200).json({
//         message: '파일이 성공적으로 저장되었습니다.',
//         picturePath,
//         pictureName,
//     });
// };

// export const thumbnail = async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({
//             message: "No file uploaded.",
//         });
//     }

//     const { filename, destination, originalname, mimetype, size } = req.file;

//     // 새로운 이미지 정보 MongoDB에 저장
//     const imageDoc = new ImageUpload({
//         filename,
//         path: destination,
//         originalname,
//         mimetype,
//         size,
//     });

//     await imageDoc.save();

//     res.status(200).json({
//         message: "파일 업로드 및 DB 저장 성공",
//         imageId: imageDoc._id,
//         imagePath: imageDoc.path,
//         imageName: imageDoc.filename,
//         url: fullUrl,
//     });
// };

// export const thumbnail = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         message: "No file uploaded.",
//       });
//     }

//     const { filename, destination, originalname, mimetype, size } = req.file;

//     const imageDoc = new ImageUpload({
//       filename,
//       path: destination,
//       originalname,
//       mimetype,
//       size,
//     });

//     await imageDoc.save();

//     // ✅ 경로 계산
//     const absoluteFilePath = path.join(destination, filename);
//     const relativePath = path.relative(path.join(process.cwd(), 'uploads'), absoluteFilePath);
//     const fullUrl = `${req.protocol}://${req.get('host')}/uploads/${relativePath.replace(/\\/g, '/')}`;

//     // res.status(200).json({
//     //   message: "파일 업로드 및 DB 저장 성공",
//     //   url: fullUrl,
//     //   imageId: imageDoc._id,
//     //   imagePath: imageDoc.path,
//     //   imageName: imageDoc.filename,
//     // });
//     res.status(200).json({
//       message: "이미지 업로드 성공",
//       url: `/uploads/${filename}`,
//       filename,
//       imageId: imageDoc._id, // ✅ 이걸 클라이언트로 넘겨줌
//     });


//   } catch (error) {
//     console.error("썸네일 업로드 에러:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const thumbnail = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded." });
//     }

//     const { filename, path: filePath, originalname, mimetype, size } = req.file;

//     const savedImage = await ImageUpload.create({
//       filename,
//       path: filePath,
//       originalname,
//       mimetype,
//       size,
//     });

//     // ✅ 클라이언트가 직접 불러올 수 있는 경로 전달
//     const relativeUrl = `thumbnail/${new Date().getFullYear()}/${(new Date().getMonth() + 1)
//       .toString()
//       .padStart(2, '0')}/${filename}`;

//     res.status(200).json({
//       message: "Image uploaded successfully.",
//       url: `${req.protocol}://${req.get("host")}/uploads/${relativeUrl}`,
//       thumbnailUrl: relativeUrl, // ⬅️ DB에 저장할 값
//       filename,
//       imageId: savedImage._id,
//     });
//   } catch (error) {
//     console.error("Image upload error:", error);
//     res.status(500).json({ message: "Image upload failed." });
//   }
// };

export const thumbnail = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const { filename, path: filePath, originalname, mimetype, size } = req.file;

    const savedImage = await ImageUpload.create({
      filename,
      path: filePath,
      originalname,
      mimetype,
      size,
    });

    // ✅ 여기를 고칩니다 — URL 경로 생성
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');

    const relativeUrl = `thumbnail/${year}/${month}/${filename}`;

    res.status(200).json({
      message: "Image uploaded successfully.",
      url: `${req.protocol}://${req.get("host")}/uploads/${relativeUrl}`,
      thumbnailUrl: relativeUrl, // ⬅️ 이게 DB에 저장될 경로입니다
      filename,
      imageId: savedImage._id,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ message: "Image upload failed." });
  }
};
