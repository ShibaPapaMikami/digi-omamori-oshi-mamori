# assets フォルダ構成

```
assets/
├── omamori/          ← お守り本体の画像
│   ├── hina.png          タレント①のお守り画像
│   ├── rio.png           タレント②のお守り画像
│   └── mei.png           タレント③のお守り画像
│
├── talent/           ← タレントのアイコン・写真
│   ├── hina_icon.png     プロフィールアイコン（推奨: 200×200px 円形）
│   ├── rio_icon.png
│   └── mei_icon.png
│
└── contents/         ← 限定コンテンツ用画像
    ├── hina_content1.png  解放される限定画像
    ├── rio_content1.png
    └── mei_content1.png
```

## 画像仕様

| 用途 | ファイル名規則 | 推奨サイズ | 形式 |
|------|--------------|-----------|------|
| お守り本体 | `omamori/{タレントID}.png` | 400×520px | PNG（透過推奨） |
| タレントアイコン | `talent/{タレントID}_icon.png` | 200×200px | PNG/JPG |
| 限定コンテンツ画像 | `contents/{タレントID}_content{N}.png` | 600×400px | PNG/JPG |

## app.jsx での参照方法

画像を配置したら app.jsx のデータ部分を以下のように変更します：

```js
// omamori フィールドに imgSrc を追加
{
  id: 1,
  talent: "桜咲 ひな",
  imgSrc: "./assets/omamori/hina.png",       // ← お守り画像
  iconSrc: "./assets/talent/hina_icon.png",  // ← アイコン
  ...
}
```
